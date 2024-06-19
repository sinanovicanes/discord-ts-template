import { Events } from "discord.js";
import { ClientReadyEvent } from "../../classes/event";

class LogReadyEvent implements ClientReadyEvent {
  event: Events = Events.ClientReady;
  once = true;

  async execute() {
    console.log("Bot is ready");
  }
}

export default new LogReadyEvent();
