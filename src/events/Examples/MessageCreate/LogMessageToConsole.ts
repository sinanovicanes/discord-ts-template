import { NotBotGuard } from "@/Guards";
import { MessageCreateEvent } from "@/lib/classes";
import { UseGuards } from "@/lib/decorators";
import { Message } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
@UseGuards(NotBotGuard)
export default class LogMessageToConsole extends MessageCreateEvent {
  async handler(message: Message) {
    const guildName = message.guild?.name ?? "DM";
    const channel = message.guild?.channels.cache.get(message.channel.id);
    const channelName = channel?.name ?? message.channel.id;

    console.log(
      `[${guildName}/${channelName}] ${message.author.tag}: ${message.content}`
    );
  }
}
