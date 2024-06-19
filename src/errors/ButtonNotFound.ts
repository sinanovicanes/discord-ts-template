import { ButtonInteraction } from "discord.js";

export class ButtonNotFound extends Error {
  constructor(interaction: ButtonInteraction) {
    interaction.reply({
      content: `Failed to find button handler`,
      ephemeral: true
    });

    super(`Button ${interaction.customId} not found`);
  }
}
