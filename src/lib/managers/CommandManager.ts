import { CommandBase, SubCommand } from "@/lib/classes";
import { Client } from "@/lib/client";
import {
  CommandNotFound,
  ContextMenuCommandNotFound,
  FailedToHandleCommand,
  FailedToHandleContextMenuCommand
} from "@/lib/errors";
import env from "@/env";
import { loadCommands } from "@/lib/utils/loaders";
import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  ContextMenuCommandInteraction,
  REST,
  Routes
} from "discord.js";
import { delay, inject, singleton } from "tsyringe";

type CommandInteractionsWithOptions =
  | ChatInputCommandInteraction
  | AutocompleteInteraction;

@singleton()
export class CommandManager {
  private commands = new Map<CommandBase["name"], CommandBase>();

  constructor(@inject(delay(() => Client)) private readonly client: Client) {}

  getCommand(name: string) {
    return this.commands.get(name);
  }

  getCommandByInteraction<T extends CommandInteractionsWithOptions>(interaction: T) {
    let commandKey = interaction.commandName;

    try {
      const group = interaction.options.getSubcommandGroup();

      if (!!group) {
        commandKey += `:${group}`;
      }

      const subCommand = interaction.options.getSubcommand();

      if (!!subCommand) {
        commandKey += `:${subCommand}`;
      }
    } catch {
      commandKey = interaction.commandName;
    }

    return this.commands.get(commandKey);
  }

  hasCommand(name: string) {
    return this.commands.has(name);
  }

  async onCommandInteraction(interaction: ChatInputCommandInteraction) {
    const command = this.getCommandByInteraction(interaction);

    if (!command) throw new CommandNotFound(interaction);

    try {
      await command.handler(interaction);
    } catch (error) {
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

  async setCommands(commands: CommandBase[]) {
    commands.forEach(command => {
      this.commands.set(command.name, command);

      command.options?.forEach(subCommand => {
        this.commands.set(
          `${command.name}:${subCommand.toJSON().name}`,
          subCommand as SubCommand
        );
      });

      if (command.userSubGroup) {
        const commandKey = `${command.name}:${command.userSubGroup.name}`;

        command.userSubGroup.options.forEach(subCommand => {
          this.commands.set(`${commandKey}:${subCommand.name}`, subCommand as SubCommand);
        });
      }
    });
  }

  private async deployCommands(commands: CommandBase[]) {
    const rest = new REST().setToken(env.BOT_TOKEN);

    try {
      await rest.put(Routes.applicationCommands(env.BOT_CLIENT_ID), {
        body: commands.map(command => command.getData())
      });
    } catch (error) {
      console.error(error);
    }
  }

  async initialize() {
    const commands = await loadCommands();

    this.setCommands(commands);
    this.deployCommands(commands);
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
