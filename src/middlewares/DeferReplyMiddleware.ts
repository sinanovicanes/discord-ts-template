import { ExecutionContext, Logger, Middleware } from "@app/common";
import { ChatInputCommandInteraction } from "discord.js";

export class DeferReplyMiddleware extends Middleware {
  private readonly logger = new Logger(DeferReplyMiddleware.name);

  use(ctx: ExecutionContext) {
    const [interaction] = ctx.getArgs<[ChatInputCommandInteraction]>();

    if (interaction.deferred)
      return this.logger.warn(
        `Interaction is already deferred, Command: ${interaction.commandName}`
      );
    interaction.deferReply({ ephemeral: true });
  }
}
