import { ClientReadyEvent } from "@lib/classes/event";

class LogReadyEvent extends ClientReadyEvent {
  once = true;
  async handler() {
    console.log("Bot is ready");
  }
}

export default new LogReadyEvent();
