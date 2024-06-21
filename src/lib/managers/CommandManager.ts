import { CommandBase } from "@/lib/classes";
import { CommandNotFound, FailedToHandleCommand } from "@/lib/errors";
import env from "@/lib/utils/env";
import {
  Client,
  CommandInteraction,
  ContextMenuCommandInteraction,
  REST,
  Routes
} from "discord.js";
import { ContextMenuCommandNotFound } from "../errors/ContextMenuCommandNotFound";
import { FailedToHandleContextMenuCommand } from "../errors/FailedToHandleContextMenuCommand";
import { loadCommands } from "../utils/loaders";

export class CommandManager {
  constructor(private readonly client: Client) {}
  private static commands = new Map<CommandBase["name"], CommandBase>(
    loadCommands().map((command: CommandBase) => [command.name, command])
  );

  static getCommand(name: string) {
    return this.commands.get(name);
  }

  static hasCommand(name: string) {
    return this.commands.has(name);
  }

  static async onCommandInteraction(interaction: CommandInteraction) {
    const command = this.getCommand(interaction.commandName);

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
    const command = this.getCommand(interaction.commandName);

    if (!command) throw new ContextMenuCommandNotFound(interaction);

    try {
      await command.handler(interaction);
    } catch (error) {
      throw new FailedToHandleContextMenuCommand(interaction);
    }
  }

  async initiliaze() {
    const rest = new REST().setToken(env.BOT_TOKEN);

    try {
      await rest.put(Routes.applicationCommands(env.BOT_CLIENT_ID), {
        body: Array.from(CommandManager.commands.values()).map(command =>
          //@ts-ignore
          command.toJSON()
        )
      });
    } catch (error) {
      console.error(error);
    }
  }

  async clearCommands() {
    const rest = new REST().setToken(env.BOT_TOKEN);

    try {
      await rest.put(Routes.applicationCommands(env.BOT_CLIENT_ID), {
        body: []
      });
    } catch (error) {
      console.error(error);
    }
  }
}
