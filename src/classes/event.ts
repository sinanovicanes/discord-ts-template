import { Events } from "discord.js";

export abstract class Event {
  once: boolean = false;

  constructor(public event: Events) {}

  abstract execute(...args: any[]): void;
}
