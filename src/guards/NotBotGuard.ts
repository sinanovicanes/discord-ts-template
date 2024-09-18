import { Guard, Injectable } from "@app/common";
import { Message } from "discord.js";

@Injectable()
export class NotBotGuard extends Guard {
  canActivate(message: Message) {
    return !message.author.bot;
  }
}
