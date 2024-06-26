import { CommandAutoComplete } from "@/lib/types/CommandAutoComplete";
import { matchClassProperties } from "@/lib/utils";
import {
  ApplicationCommandType,
  ChatInputCommandInteraction,
  CommandInteraction,
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
  ContextMenuCommandType,
  MessageContextMenuCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
  ToAPIApplicationCommandOptions,
  UserContextMenuCommandInteraction
} from "discord.js";

export interface CommandBase {
  name: string;
  handler(interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction): void;
  userSubGroup?: SubCommandGroup;
  options?: ToAPIApplicationCommandOptions[];
  guilds?: string[];
  toJSON(): Object;
  getData(): Record<string, any>;
}

export interface SlashCommandProps {
  subCommands?: SubCommand[];
  subCommandGroup?: SubCommandGroup;
}

export abstract class SlashCommand extends SlashCommandBuilder implements CommandBase {
  abstract name: string;
  abstract description: string;
  abstract handler(interaction: ChatInputCommandInteraction): void;
  autoComplete?: CommandAutoComplete;
  guilds?: string[];

  constructor({ subCommands, subCommandGroup }: SlashCommandProps = {}) {
    super();

    if (subCommands) subCommands.forEach(subCommand => this.addSubcommand(subCommand));
    if (subCommandGroup) this.addSubcommandGroup(subCommandGroup);
  }

  getData() {
    return matchClassProperties(SlashCommandBuilder, this);
  }
}

export abstract class UserContextMenuCommand
  extends ContextMenuCommandBuilder
  implements CommandBase
{
  abstract name: string;
  abstract handler(interaction: UserContextMenuCommandInteraction): void;
  type = ApplicationCommandType.User as ContextMenuCommandType;
  guilds?: string[];

  getData() {
    return matchClassProperties(ContextMenuCommandBuilder, this);
  }
}

export abstract class MessageContextMenuCommand
  extends ContextMenuCommandBuilder
  implements CommandBase
{
  abstract name: string;
  abstract handler(interaction: MessageContextMenuCommandInteraction): void;
  type = ApplicationCommandType.Message as ContextMenuCommandType;
  guilds?: string[];

  getData() {
    return matchClassProperties(ContextMenuCommandBuilder, this);
  }
}

export abstract class SubCommand extends SlashCommandSubcommandBuilder {
  abstract name: string;
  abstract description: string;
  abstract handler(interaction: ChatInputCommandInteraction): void;
  autoComplete?: CommandAutoComplete;

  getData() {
    return matchClassProperties(SlashCommandSubcommandBuilder, this);
  }
}

export abstract class SubCommandGroup extends SlashCommandSubcommandGroupBuilder {
  abstract name: string;
  abstract description: string;
  abstract handler(interaction: CommandInteraction): void;

  constructor(...subCommands: SubCommand[]) {
    super();

    if (!subCommands) return;

    subCommands.forEach(subCommand => this.addSubcommand(subCommand));
  }

  getData() {
    return matchClassProperties(SlashCommandSubcommandGroupBuilder, this);
  }
}
