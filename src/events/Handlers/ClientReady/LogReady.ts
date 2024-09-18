import { ClientReadyEvent, Injectable, Logger } from "@app/common";

@Injectable()
export default class LogReady extends ClientReadyEvent {
  private readonly logger = new Logger(LogReady.name);

  once = true;

  handler() {
    this.logger.log("Bot is ready");
  }
}
