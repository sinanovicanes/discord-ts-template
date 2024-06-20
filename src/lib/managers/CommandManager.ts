import {
  Client,
  CommandInteraction,
  ContextMenuCommandInteraction,
  REST,
  Routes
} from "discord.js";
import { Command, ContextMenuCommand } from "@lib/classes";
import Commands from "@/commands";
import { CommandNotFound, FailedToHandleCommand } from "@lib/errors";
import env from "@lib/utils/env";
import { FailedToHandleContextMenuCommand } from "../errors/FailedToHandleContextMenuCommand";
import { ContextMenuCommandNotFound } from "../errors/ContextMenuCommandNotFound";

type TCommands = Command | ContextMenuCommand;

export class CommandManager {
  constructor(private readonly client: Client) {}
  private static commands = new Map<TCommands["name"], TCommands>(
    Commands.map(command => [command.name, command])
  );

  static getCommand<T extends TCommands = TCommands>(name: string) {
    return this.commands.get(name) as T;
  }

  static hasCommand(name: string) {
    return this.commands.has(name);
  }

  static async onCommandInteraction(interaction: CommandInteraction) {
    const command = this.getCommand<Command>(interaction.commandName);

    if (!command) throw new CommandNotFound(interaction);

    try {
      await command.handler(interaction);
    } catch (error) {
      throw new FailedToHandleCommand(interaction);
    }
  }

  static async onContextMenuCommandInteraction(
    interaction: ContextMenuCommandInteraction
  ) {
    const command = this.getCommand<ContextMenuCommand>(interaction.commandName);

    if (!command) throw new ContextMenuCommandNotFound(interaction);

    try {
      await command.handler(interaction);
    } catch (error) {
      throw new FailedToHandleContextMenuCommand(interaction);
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
