import { Events } from "discord.js";
import { Event } from "../../classes/event";

class LogReadyEvent implements Event {
  event: Events = Events.ClientReady;
  once = true;

  async execute() {
    console.log("Bot is ready");
  }
}

export default new LogReadyEvent();
