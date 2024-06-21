import {
  CommandInteraction,
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
  SlashCommandBuilder
} from "discord.js";
import { CommandAutoComplete } from "../types/CommandAutoComplete";

export interface CommandBase {
  name: string;
  handler(interaction: CommandInteraction | ContextMenuCommandInteraction): void;
  toJSON(): void;
}

export abstract class SlashCommand extends SlashCommandBuilder implements CommandBase {
  abstract description: string;
  abstract handler(interaction: CommandInteraction): void;
  autoComplete?: CommandAutoComplete;
}

export abstract class ContextMenuCommand
  extends ContextMenuCommandBuilder
  implements CommandBase
{
  abstract name: string;
  abstract handler(interaction: ContextMenuCommandInteraction): void;
}
