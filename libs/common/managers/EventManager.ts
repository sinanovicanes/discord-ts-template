import { ClientEvents } from "discord.js";
import { delay, inject, singleton } from "tsyringe";
import { Event, Logger } from "../classes";
import { FailedToHandleEvent, GuardError } from "../errors";
import { loadEvents } from "../utils/loaders";
import { Client } from "../client";
import { pluralify } from "../utils";

@singleton()
export class EventManager {
  private readonly logger = new Logger(EventManager.name);
  constructor(@inject(delay(() => Client)) private readonly client: Client) {}

  private async trigger<T extends keyof ClientEvents>(
    event: Event<T>,
    ...args: ClientEvents[T]
  ) {
    try {
      await event.handler(...args);
    } catch (error) {
      if (error instanceof GuardError) return;
      throw new FailedToHandleEvent(event);
    }
  }

  private addEventHandler<T extends keyof ClientEvents>(event: Event<T>) {
    if (event.once)
      return this.client.once(event.event as T, (...args: ClientEvents[T]) => {
        this.trigger(event, ...args).catch(e => this.logger.error(e));
      });

    this.client.on(event.event as T, (...args: ClientEvents[T]) => {
      this.trigger(event, ...args).catch(e => this.logger.error(e));
    });
  }

  async initialize() {
    const events = await loadEvents();
    events.forEach(event => this.addEventHandler(event));
    this.logger.info(
      `${events.length} ${pluralify("event", "events", events.length)} loaded`
    );
  }
}
