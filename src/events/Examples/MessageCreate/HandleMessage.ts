import { MessageCreateEvent } from "@/lib/classes";
import { Message } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
export default class LogMessageToConsole extends MessageCreateEvent {
  async handler(message: Message) {
    if (message.author.bot) return;

    const guildName = message.guild?.name ?? "DM";
    const channel = message.guild?.channels.cache.get(message.channel.id);
    const channelName = channel?.name ?? message.channel.id;

    console.log(
      `[${guildName}/${channelName}] ${message.author.tag}: ${message.content}`
    );
  }
}
