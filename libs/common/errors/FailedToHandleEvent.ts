import { Event } from "../classes/events";

export class FailedToHandleEvent extends Error {
  constructor(event: Event) {
    super(`Failed to handle event: ${event.constructor.name} (${event.event})`);
  }
}
