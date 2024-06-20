import { Client, ClientEvents } from "discord.js";
import { Event } from "../classes";
import { FailedToHandleEvent } from "../errors";
import Events from "@/events";

export class EventManager {
  constructor(private readonly client: Client) {}

  private async trigger<T extends Event>(event: T, ...args: Parameters<T["handler"]>) {
    try {
      await event.handler(...args);
    } catch (error) {
      throw new FailedToHandleEvent(event);
    }
  }

  addEventHandler<T extends keyof ClientEvents>(event: Event<T>) {
    if (event.once)
      return this.client.once(event.event as string, async (...args: ClientEvents[T]) => {
        this.trigger(event, ...args);
      });

    this.client.on(event.event as string, async (...args: ClientEvents[T]) => {
      this.trigger(event, ...args);
    });
  }

  initiliaze() {
    Events.forEach(event => this.addEventHandler(event as Event));
  }
}
