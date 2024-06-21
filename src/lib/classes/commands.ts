import {
  CommandInteraction,
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
  SlashCommandBuilder
} from "discord.js";
import { CommandAutoComplete } from "../types/CommandAutoComplete";

export abstract class CommandBase {
  abstract name: string;
  abstract handler(interaction: CommandInteraction | ContextMenuCommandInteraction): void;
}

export abstract class SlashCommand extends SlashCommandBuilder implements CommandBase {
  abstract handler(interaction: CommandInteraction): void;
  autoComplete?: CommandAutoComplete;
}

export abstract class ContextMenuCommand
  extends ContextMenuCommandBuilder
  implements CommandBase
{
  abstract handler(interaction: ContextMenuCommandInteraction): void;
}
