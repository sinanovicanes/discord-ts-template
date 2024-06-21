import { ClientReadyEvent } from "@/lib/classes/events";
import { Client } from "@/lib/client";

class LogReady extends ClientReadyEvent {
  constructor(private readonly client: Client) {
    super();
  }

  once = true;
  async handler() {
    console.log("Bot is ready");
  }
}

export default LogReady;
