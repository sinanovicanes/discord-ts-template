import { MessageCreateEvent } from "@/lib/classes";
import { Message } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
export default class LogMessageToConsole extends MessageCreateEvent {
  async handler(message: Message) {
    if (message.author.bot) return;
    console.log(`[${message.channel.id}] ${message.author.tag}: ${message.content}`);
  }
}
