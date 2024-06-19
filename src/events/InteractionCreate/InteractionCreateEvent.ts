import { Events } from "discord.js";
import { Event } from "../../classes/event";

export abstract class InteractionCreateEvent extends Event {
  constructor() {
    super(Events.InteractionCreate);
  }
}
