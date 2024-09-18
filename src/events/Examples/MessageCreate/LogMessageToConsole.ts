import { NotBotGuard } from "@/guards";
import { Injectable, Logger, MessageCreateEvent, UseGuards } from "@app/common";
import { Message } from "discord.js";

@Injectable()
@UseGuards(NotBotGuard)
export default class LogMessageToConsole extends MessageCreateEvent {
  private readonly logger = new Logger(LogMessageToConsole.name);

  handler(message: Message) {
    const guildName = message.guild?.name ?? "DM";
    const channel = message.guild?.channels.cache.get(message.channel.id);
    const channelName = channel?.name ?? message.channel.id;

    this.logger.log(
      `[${guildName}/${channelName}] ${message.author.tag}: ${message.content}`
    );
  }
}
