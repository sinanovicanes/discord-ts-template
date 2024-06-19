import { Events } from "discord.js";

export class Event {
  constructor(
    public event: Events,
    public execute: (...args: any[]) => void,
    public once = false
  ) {}
}
