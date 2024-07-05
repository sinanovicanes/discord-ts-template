import { ButtonInteraction } from "discord.js";

export class FailedToHandleButton extends Error {
  constructor(interaction: ButtonInteraction) {
    if (interaction.deferred || interaction.replied) return;
    interaction
      .reply({
        content: `Failed to handle button`,
        ephemeral: true
      })
      .catch(() => {});

    super(`Failed to handle button: ${interaction.customId}`);
  }
}
