import { ButtonInteraction } from "discord.js";

export class FailedToHandleButton extends Error {
  constructor(interaction: ButtonInteraction) {
    interaction.reply({
      content: `Failed to handle button`,
      ephemeral: true
    });

    super(`Failed to handle button: ${interaction.customId}`);
  }
}
