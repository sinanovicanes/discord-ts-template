import { AnySelectMenuInteraction } from "discord.js";

export class FailedToHandleSelectMenu extends Error {
  constructor(interaction: AnySelectMenuInteraction) {
    if (interaction.deferred || interaction.replied) return;
    interaction
      .reply({
        content: `Failed to handle select menu`,
        ephemeral: true
      })
      .catch(() => {});

    super(`Failed to handle select menu: ${interaction.customId}`);
  }
}
