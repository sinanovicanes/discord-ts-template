import { AnySelectMenuInteraction } from "discord.js";

export class FailedToHandleSelectMenu extends Error {
  constructor(interaction: AnySelectMenuInteraction) {
    interaction.reply({
      content: `Failed to handle select menu`,
      ephemeral: true
    });

    super(`Failed to handle select menu: ${interaction.customId}`);
  }
}
