import { CommandBase } from "@/lib/classes";
import { Client } from "@/lib/client";
import {
  CommandNotFound,
  ContextMenuCommandNotFound,
  FailedToHandleCommand,
  FailedToHandleContextMenuCommand
} from "@/lib/errors";
import env from "@/lib/utils/env";
import { loadCommands } from "@/lib/utils/loaders";
import {
  CommandInteraction,
  ContextMenuCommandInteraction,
  REST,
  Routes
} from "discord.js";
import { delay, inject, singleton } from "tsyringe";

@singleton()
export class CommandManager {
  private commands = new Map<CommandBase["name"], CommandBase>();

  constructor(@inject(delay(() => Client)) private readonly client: Client) {}

  getCommand(name: string) {
    return this.commands.get(name);
  }

  hasCommand(name: string) {
    return this.commands.has(name);
  }

  async onCommandInteraction(interaction: CommandInteraction) {
    const command = this.getCommand(interaction.commandName);

    if (!command) throw new CommandNotFound(interaction);

    try {
      await command.handler(interaction);
    } catch (error) {
      console.error(error);
      throw new FailedToHandleCommand(interaction);
    }
  }

  async onContextMenuCommandInteraction(interaction: ContextMenuCommandInteraction) {
    const command = this.getCommand(interaction.commandName);

    if (!command) throw new ContextMenuCommandNotFound(interaction);

    try {
      await command.handler(interaction);
    } catch (error) {
      throw new FailedToHandleContextMenuCommand(interaction);
    }
  }

  async initialize() {
    const commands = await loadCommands();

    this.commands = new Map<CommandBase["name"], CommandBase>(
      commands.map(command => [command.name, command])
    );

    const rest = new REST().setToken(env.BOT_TOKEN);

    try {
      await rest.put(Routes.applicationCommands(env.BOT_CLIENT_ID), {
        body: commands.map(command => command.getData())
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
