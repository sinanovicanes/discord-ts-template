import { CommandAutoComplete } from "@/lib/types/CommandAutoComplete";
import {
  CommandInteraction,
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder
} from "discord.js";
import { matchClassProperties } from "../utils";

export interface CommandBase {
  name: string;
  handler(interaction: CommandInteraction | ContextMenuCommandInteraction): void;
  toJSON(): Object;
  getData(): Record<string, any>;
}

export abstract class SlashCommand extends SlashCommandBuilder implements CommandBase {
  abstract description: string;
  abstract handler(interaction: CommandInteraction): void;
  autoComplete?: CommandAutoComplete;

  constructor() {
    super();
  }

  getData() {
    return matchClassProperties(SlashCommandBuilder, this);
  }
}

export abstract class ContextMenuCommand
  extends ContextMenuCommandBuilder
  implements CommandBase
{
  abstract name: string;
  abstract handler(interaction: ContextMenuCommandInteraction): void;

  getData() {
    return matchClassProperties(ContextMenuCommandBuilder, this);
  }
}

export abstract class SubCommand extends SlashCommandSubcommandBuilder {
  abstract name: string;
  abstract handler(interaction: CommandInteraction): void;

  constructor() {
    super();
  }

  getData() {
    return matchClassProperties(SlashCommandSubcommandBuilder, this);
  }
}

export abstract class SubCommandGroup extends SlashCommandSubcommandGroupBuilder {
  abstract name: string;
  abstract handler(interaction: CommandInteraction): void;

  constructor() {
    super();
  }

  getData() {
    return matchClassProperties(SlashCommandSubcommandGroupBuilder, this);
  }
}
