import { CommandInteraction, ContextMenuCommandInteraction } from "discord.js";

export class FailedToHandleContextMenuCommand extends Error {
  constructor(interaction: ContextMenuCommandInteraction) {
    if (interaction.deferred || interaction.replied) return;
    interaction
      .reply({
        content: `Failed to handle context menu command: ${interaction.commandName}`,
        ephemeral: true
      })
      .catch(() => {});

    super(`Failed to handle context menu command: ${interaction.commandName}`);
  }
}
