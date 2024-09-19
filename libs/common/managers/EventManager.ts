import { ClientEvents } from "discord.js";
import { Event } from "../classes";
import { Client } from "../client";
import { Inject, Injectable } from "../decorators";
import { FailedToHandleEvent, GuardError } from "../errors";
import { pluralify } from "../utils";
import { loadEvents } from "../utils/loaders";
import { BaseManager } from "./BaseManager";

@Injectable()
export class EventManager extends BaseManager {
  constructor(@Inject(() => Client) private readonly client: Client) {
    super();
  }

  private async trigger<T extends keyof ClientEvents>(
    event: Event<T>,
    ...args: ClientEvents[T]
  ) {
    try {
      await this.middlewareExecutor.execute(event as Function & Event<T>, ...args);
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
