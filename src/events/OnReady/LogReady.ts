import { ClientReadyEvent } from "@/lib/classes/events";
import { singleton } from "tsyringe";

@singleton()
class LogReady extends ClientReadyEvent {
  constructor() {
    super();
  }

  once = true;
  async handler() {
    console.log("Bot is ready");
  }
}

export default LogReady;
