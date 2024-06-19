import { Events } from "discord.js";
import { Event } from "../../classes/event";

export abstract class OnReadyEvent extends Event {
  constructor() {
    super(Events.ClientReady);
  }
}
