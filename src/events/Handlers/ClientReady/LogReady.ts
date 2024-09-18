import { ClientReadyEvent, Logger } from "@app/common";
import { singleton } from "tsyringe";

@singleton()
export default class LogReady extends ClientReadyEvent {
  private readonly logger = new Logger(LogReady.name);

  once = true;

  handler() {
    this.logger.log("Bot is ready");
  }
}
