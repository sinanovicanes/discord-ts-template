import env from "../utils/env";
import { CommandBase, Logger, SubCommand, SubCommandGroup } from "../classes";
import {
  CommandNotFound,
  ContextMenuCommandNotFound,
  FailedToHandleCommand,
  FailedToHandleContextMenuCommand,
  GuardError
} from "../errors";
import { loadCommands } from "../utils/loaders";
import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  Collection,
  ContextMenuCommandInteraction,
  REST,
  Routes
} from "discord.js";
import { singleton } from "tsyringe";

type CommandInteractionsWithOptions =
  | ChatInputCommandInteraction
  | AutocompleteInteraction;

@singleton()
export class CommandManager {
  private readonly logger = new Logger(CommandManager.name);
  private readonly commands = new Collection<CommandBase["name"], CommandBase>();

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

  onCommandInteraction(interaction: ChatInputCommandInteraction) {
    this.handleCommandInteraction(interaction).catch(e => this.logger.error(e));
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

  onContextMenuCommandInteraction(interaction: ContextMenuCommandInteraction) {
    this.handleContextMenuCommandInteraction(interaction).catch(e =>
      this.logger.error(e)
    );
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
    return this.commands.filter(command => command.guilds?.includes(guildId));
  }

  private async deployCommands(commands: CommandBase[]) {
    const rest = new REST().setToken(env.BOT_TOKEN);
    const body = commands
      .filter(command => !command.guilds)
      .map(command => command.getData());

    rest
      .put(Routes.applicationCommands(env.BOT_CLIENT_ID), {
        body
      })
      .catch(e => this.logger.error(e));
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

    if (!commands.size) return;

    const rest = new REST().setToken(env.BOT_TOKEN);
    const body = commands.map(command => command.getData());

    rest
      .put(Routes.applicationGuildCommands(env.BOT_CLIENT_ID, guildId), {
        body
      })
      .catch(e => this.logger.error(e));
  }

  async initialize() {
    const commands = await loadCommands();

    this.setCommands(commands);
    this.deployCommands(commands);
    this.deployGuildCommands(commands);
  }

  async clearCommands() {
    const rest = new REST().setToken(env.BOT_TOKEN);

    rest
      .put(Routes.applicationCommands(env.BOT_CLIENT_ID), {
        body: []
      })
      .catch(e => this.logger.error(e));
  }
}
