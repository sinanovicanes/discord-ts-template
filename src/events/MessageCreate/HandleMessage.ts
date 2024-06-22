import { MessageCreateEvent } from "@/lib/classes";
import { Message } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
export default class HandleMessage extends MessageCreateEvent {
  constructor() {
    super();
  }

  async handler(message: Message) {
    if (message.author.bot) return;
    message.reply(`Hello, ${message.author}!`);
  }
}
