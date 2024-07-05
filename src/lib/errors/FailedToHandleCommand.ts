import { CommandInteraction } from "discord.js";

export class FailedToHandleCommand extends Error {
  constructor(interaction: CommandInteraction) {
    if (interaction.deferred || interaction.replied) return;
    interaction
      .reply({
        content: `Failed to handle command: ${interaction.commandName}`,
        ephemeral: true
      })
      .catch(() => {});

    super(`Failed to handle command: ${interaction.commandName}`);
  }
}
