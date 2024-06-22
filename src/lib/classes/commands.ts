import {
  CommandInteraction,
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
  SlashCommandBuilder
} from "discord.js";
import { CommandAutoComplete } from "@/lib/types/CommandAutoComplete";

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
    const data: Record<string, any> = {};
    const rawCommand = new SlashCommandBuilder();

    for (const key in rawCommand) {
      if (typeof rawCommand[key as keyof SlashCommandBuilder] === "function") continue;

      data[key] = this[key as keyof SlashCommandBuilder];
    }

    return data;
  }
}

export abstract class ContextMenuCommand
  extends ContextMenuCommandBuilder
  implements CommandBase
{
  abstract name: string;
  abstract handler(interaction: ContextMenuCommandInteraction): void;

  getData() {
    const data: Record<string, any> = {};
    const rawCommand = new ContextMenuCommandBuilder();

    for (const key in rawCommand) {
      if (typeof rawCommand[key as keyof ContextMenuCommandBuilder] === "function")
        continue;

      data[key] = this[key as keyof ContextMenuCommandBuilder];
    }

    return data;
  }
}
