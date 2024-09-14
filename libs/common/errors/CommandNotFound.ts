import { CommandInteraction } from "discord.js";

export class CommandNotFound extends Error {
  constructor(interaction: CommandInteraction) {
    interaction.reply({
      content: `Failed to execute command: ${interaction.commandName}`,
      ephemeral: true
    });

    super(`Command ${interaction.commandName} not found`);
  }
}
