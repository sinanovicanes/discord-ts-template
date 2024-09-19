import { Interaction } from "discord.js";
import { ExecutionContext } from "../classes";
import { tryToReplyInteraction } from "../utils";

export class GuardError extends Error {
  constructor(message: string, ctx: ExecutionContext) {
    super(message);

    // Check if the args has interaction and if it is repliable
    const [interaction] = ctx.getArgs<[Interaction]>();

    tryToReplyInteraction(interaction, {
      content: this.message,
      ephemeral: true
    });
  }
}
