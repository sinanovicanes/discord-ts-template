import { ClientReadyEvent } from "@/lib/classes/events";
import { singleton } from "tsyringe";

@singleton()
class LogReady extends ClientReadyEvent {
  once = true;

  async handler() {
    console.log("Bot is ready");
  }
}

export default LogReady;
