import { Logger, Middleware } from "@app/common";
import { ChatInputCommandInteraction } from "discord.js";

export class DeferReplyMiddleware extends Middleware<ChatInputCommandInteraction> {
  private readonly logger = new Logger(DeferReplyMiddleware.name);

  use(interaction: ChatInputCommandInteraction) {
    if (interaction.deferred)
      return this.logger.warn(
        `Interaction is already deferred, Command: ${interaction.commandName}`
      );
    interaction.deferReply({ ephemeral: true });
  }
}
