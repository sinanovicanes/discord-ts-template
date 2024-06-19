import { Events } from "discord.js";

export class FailedToHandleEvent extends Error {
  constructor(name: Events) {
    super(`Failed to handle event: ${name}`);
  }
}
