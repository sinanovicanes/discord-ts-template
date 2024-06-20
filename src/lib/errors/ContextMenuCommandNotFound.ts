import { ContextMenuCommandInteraction } from "discord.js";

export class ContextMenuCommandNotFound extends Error {
  constructor(interaction: ContextMenuCommandInteraction) {
    interaction.reply({
      content: `Failed to handle context menu command: ${interaction.commandName}`,
      ephemeral: true
    });

    super(`Context menu command ${interaction.commandName} not found`);
  }
}
