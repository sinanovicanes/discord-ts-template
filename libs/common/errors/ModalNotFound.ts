import { ModalSubmitInteraction } from "discord.js";

export class ModalNotFound extends Error {
  constructor(interaction: ModalSubmitInteraction) {
    interaction.reply({
      content: `Failed to find modal handler`,
      ephemeral: true
    });

    super(`Modal ${interaction.customId} not found`);
  }
}
