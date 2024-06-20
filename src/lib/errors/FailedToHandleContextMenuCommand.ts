import { CommandInteraction, ContextMenuCommandInteraction } from "discord.js";

export class FailedToHandleContextMenuCommand extends Error {
  constructor(interaction: ContextMenuCommandInteraction) {
    interaction.reply({
      content: `Failed to handle context menu command: ${interaction.commandName}`,
      ephemeral: true
    });

    super(`Failed to handle context menu command: ${interaction.commandName}`);
  }
}
