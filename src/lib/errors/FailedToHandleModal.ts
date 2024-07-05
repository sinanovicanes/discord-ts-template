import { ModalSubmitInteraction } from "discord.js";

export class FailedToHandleModal extends Error {
  constructor(interaction: ModalSubmitInteraction) {
    if (interaction.deferred || interaction.replied) return;
    interaction.reply({
      content: `Failed to handle modal`,
      ephemeral: true
    });

    super(`Failed to handle modal: ${interaction.customId}`);
  }
}
