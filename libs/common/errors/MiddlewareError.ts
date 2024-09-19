import { Interaction } from "discord.js";
import { ExecutionContext } from "../classes";

export class MiddlewareError extends Error {
  constructor(message: string, ctx: ExecutionContext) {
    super(message);

    // Check if the args has interaction and if it is repliable
    const [interaction] = ctx.getArgs<[Interaction]>();

    if (!interaction || !("isRepliable" in interaction) || !interaction.isRepliable())
      return;

    interaction
      .reply({
        content: this.message,
        ephemeral: true
      })
      .catch();
  }
}
