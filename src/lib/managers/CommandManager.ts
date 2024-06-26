import { CommandBase, SubCommand, SubCommandGroup } from "@/lib/classes";
import { Client } from "@/lib/client";
import {
  CommandNotFound,
  ContextMenuCommandNotFound,
  FailedToHandleCommand,
  FailedToHandleContextMenuCommand,
  GuardError
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

  async handleCommandInteraction(interaction: ChatInputCommandInteraction) {
    const command = this.getCommandByInteraction(interaction);

    if (!command) throw new CommandNotFound(interaction);

    try {
      await command.handler(interaction);
    } catch (error) {
      if (error instanceof GuardError) return;
      throw new FailedToHandleCommand(interaction);
    }
  }

  async onCommandInteraction(interaction: ChatInputCommandInteraction) {
    try {
      await this.handleCommandInteraction(interaction);
    } catch (error) {
      console.error(error);
    }
  }

  private async handleContextMenuCommandInteraction(
    interaction: ContextMenuCommandInteraction
  ) {
    const command = this.getCommand(interaction.commandName);

    if (!command) throw new ContextMenuCommandNotFound(interaction);

    try {
      await command.handler(interaction);
    } catch (error) {
      if (error instanceof GuardError) return;
      throw new FailedToHandleContextMenuCommand(interaction);
    }
  }

  async onContextMenuCommandInteraction(interaction: ContextMenuCommandInteraction) {
    try {
      await this.handleContextMenuCommandInteraction(interaction);
    } catch (error) {
      console.error(error);
    }
  }

  private async setCommands(commands: CommandBase[]) {
    commands.forEach(command => {
      this.commands.set(command.name, command);

      command.options?.forEach(sub => {
        switch (true) {
          case sub instanceof SubCommand:
            this.commands.set(`${command.name}:${sub.name}`, sub);
            return;
          case sub instanceof SubCommandGroup:
            const commandKey = `${command.name}:${sub.name}`;

            sub.options.forEach(subCommand => {
              this.commands.set(
                `${commandKey}:${subCommand.name}`,
                subCommand as SubCommand
              );
            });
            break;
        }
      });
    });
  }

  private getGuildCommands(guildId: string) {
    return Array.from(this.commands.values()).filter(command =>
      command.guilds?.includes(guildId)
    );
  }

  private async deployCommands(commands: CommandBase[]) {
    const rest = new REST().setToken(env.BOT_TOKEN);
    const body = commands
      .filter(command => !command.guilds)
      .map(command => command.getData());

    try {
      await rest.put(Routes.applicationCommands(env.BOT_CLIENT_ID), {
        body
      });
    } catch (error) {
      console.error(error);
    }
  }

  private async deployGuildCommands(commands: CommandBase[]) {
    const guildIds = new Set<string>(
      commands.reduce((acc, command) => {
        if (!command.guilds) return acc;
        return acc.concat(command.guilds);
      }, [] as string[])
    );

    guildIds.forEach(guildId => this.deployCommandsOnGuild(guildId));
  }

  async deployCommandsOnGuild(guildId: string) {
    const commands = this.getGuildCommands(guildId);

    if (!commands.length) return;

    const rest = new REST().setToken(env.BOT_TOKEN);
    const body = commands.map(command => command.getData());

    try {
      await rest.put(Routes.applicationGuildCommands(env.BOT_CLIENT_ID, guildId), {
        body
      });
    } catch (error) {
      console.error(error);
    }
  }

  async initialize() {
    const commands = await loadCommands();

    this.setCommands(commands);
    this.deployCommands(commands);
    this.deployGuildCommands(commands);
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
