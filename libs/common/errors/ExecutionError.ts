import { Interaction } from "discord.js";
import { ExecutionContext } from "../classes";
import { tryToReplyInteraction } from "../utils";

export class ExecutionError extends Error {
  constructor(message: string, ctx: ExecutionContext) {
    super(message);

    const [interaction] = ctx.getArgs<[Interaction]>();

    tryToReplyInteraction(interaction, {
      content: this.message,
      ephemeral: true
    });
  }
}
