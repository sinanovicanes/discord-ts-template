import { Client, CommandInteraction, REST, Routes } from "discord.js";
import { Command } from "@lib/classes";
import Commands from "@/commands";
import { CommandNotFound, FailedToExecuteCommand } from "@lib/errors";
import env from "@lib/utils/env";

export class CommandManager {
  constructor(private readonly client: Client) {}
  private static commands = new Map<Command["name"], Command>(
    Commands.map(command => [command.name, command])
  );

  static getCommand(name: string) {
    return this.commands.get(name);
  }

  static hasCommand(name: string) {
    return this.commands.has(name);
  }

  static async onCommandInteraction(interaction: CommandInteraction) {
    const command = this.commands.get(interaction.commandName);

    if (!command) throw new CommandNotFound(interaction);

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      throw new FailedToExecuteCommand(interaction);
    }
  }

  async initiliaze() {
    const rest = new REST().setToken(env.BOT_TOKEN!);

    try {
      await rest.put(Routes.applicationCommands(env.BOT_CLIENT_ID!), {
        body: Array.from(CommandManager.commands.values()).map(command =>
          command.builder.toJSON()
        )
      });
    } catch (error) {
      console.error(error);
    }
  }

  async clearCommands() {
    const rest = new REST().setToken(env.BOT_TOKEN!);

    try {
      await rest.put(Routes.applicationCommands(env.BOT_CLIENT_ID!), {
        body: []
      });
    } catch (error) {
      console.error(error);
    }
  }
}
