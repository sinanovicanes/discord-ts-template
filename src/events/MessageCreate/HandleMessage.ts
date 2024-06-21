import { MessageCreateEvent } from "@/lib/classes";
import { Client } from "@/lib/client";
import { Message } from "discord.js";

export default class HandleMessage extends MessageCreateEvent {
  constructor(private readonly client: Client) {
    super();
  }

  async handler(message: Message) {
    if (message.author.bot) return;
    message.reply(`Hello, ${message.author}!`);
  }
}
