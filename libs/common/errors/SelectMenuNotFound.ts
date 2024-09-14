import { AnySelectMenuInteraction } from "discord.js";

export class SelectMenuNotFound extends Error {
  constructor(interaction: AnySelectMenuInteraction) {
    interaction.reply({
      content: `Failed to find select menu handler`,
      ephemeral: true
    });

    super(`Select menu ${interaction.customId} not found`);
  }
}
