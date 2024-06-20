import { ClientReadyEvent } from "@/lib/classes/events";

class LogReadyEvent extends ClientReadyEvent {
  once = true;
  async handler() {
    console.log("Bot is ready");
  }
}

export default LogReadyEvent;
