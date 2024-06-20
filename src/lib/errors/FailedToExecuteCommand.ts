import { CommandInteraction } from "discord.js";

export class FailedToExecuteCommand extends Error {
  constructor(interaction: CommandInteraction) {
    interaction.reply({
      content: `Failed to execute command: ${interaction.commandName}`,
      ephemeral: true
    });

    super(`Failed to execute command: ${interaction.commandName}`);
  }
}
