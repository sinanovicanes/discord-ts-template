import { MessageCreateEvent } from "@/lib/classes";
import { Message } from "discord.js";

export default class HandleMessage extends MessageCreateEvent {
  async handler(message: Message) {
    if (message.author.bot) return;
    message.reply(`Hello, ${message.author}!`);
  }
}
