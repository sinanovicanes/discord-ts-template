import { Client } from "discord.js";
import { Event } from "../classes/event";
import Events from "../events";
import { FailedToHandleEvent } from "../errors";

export class EventManager {
  constructor(private readonly client: Client) {}

  private async execute(event: Event, ...args: any[]) {
    try {
      await event.execute(...args);
    } catch (error) {
      throw new FailedToHandleEvent(event);
    }
  }

  initiliaze() {
    Events.forEach((event: Event) => {
      if (event.once)
        return this.client.once(event.event as string, async (...args: any[]) => {
          this.execute(event, ...args);
        });

      this.client.on(event.event as string, async (...args: any[]) => {
        this.execute(event, ...args);
      });
    });
  }
}
