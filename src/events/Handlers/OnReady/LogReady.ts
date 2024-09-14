import { ClientReadyEvent, Logger } from "@app/common";
import { singleton } from "tsyringe";

@singleton()
class LogReady extends ClientReadyEvent {
  private readonly logger = new Logger(LogReady.name);

  once = true;

  async handler() {
    this.logger.info("Bot is ready");
  }
}

export default LogReady;
