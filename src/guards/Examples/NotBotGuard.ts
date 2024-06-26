import { Guard } from "@/lib/classes";
import { Message } from "discord.js";
import { injectable } from "tsyringe";

@injectable()
export class NotBotGuard extends Guard {
  canActivate(message: Message) {
    return !message.author.bot;
  }
}
