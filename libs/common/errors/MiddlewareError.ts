import { Interaction } from "discord.js";
import { ExecutionContext } from "../classes";

export class MiddlewareError extends Error {
  constructor(message: string, ctx: ExecutionContext) {
    super(message);

    const [interaction] = ctx.getArgs<[Interaction]>();

    if (!("isRepliable" in interaction) || !interaction.isRepliable()) return;

    interaction
      .reply({
        content: this.message,
        ephemeral: true
      })
      .catch();
  }
}
