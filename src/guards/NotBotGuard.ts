import { ExecutionContext, Guard, Injectable } from "@app/common";
import { Message } from "discord.js";

@Injectable()
export class NotBotGuard extends Guard {
  canActivate(ctx: ExecutionContext): boolean {
    const [message] = ctx.getArgs<[Message]>();

    return !message.author.bot;
  }
}
