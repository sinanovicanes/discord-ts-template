import { ClientEvents } from "discord.js";
import { delay, inject, singleton } from "tsyringe";
import { Event } from "@/lib/classes";
import { FailedToHandleEvent } from "@/lib/errors";
import { loadEvents } from "@/lib/utils/loaders";
import { Client } from "@/lib/client";

@singleton()
export class EventManager {
  constructor(@inject(delay(() => Client)) private readonly client: Client) {}

  private async trigger<T extends keyof ClientEvents>(
    event: Event<T>,
    ...args: ClientEvents[T]
  ) {
    try {
      await event.handler(...args);
    } catch (error) {
      throw new FailedToHandleEvent(event);
    }
  }

  private addEventHandler<T extends keyof ClientEvents>(event: Event<T>) {
    if (event.once)
      return this.client.once(event.event as T, async (...args: ClientEvents[T]) => {
        this.trigger(event, ...args);
      });

    this.client.on(event.event as T, async (...args: ClientEvents[T]) => {
      this.trigger(event, ...args);
    });
  }

  async initialize() {
    const events = await loadEvents();
    events.forEach(event => this.addEventHandler(event));
  }
}
