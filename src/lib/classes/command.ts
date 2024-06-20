import {
  ApplicationCommandType,
  CommandInteraction,
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
  SlashCommandBuilder
} from "discord.js";
import { CommandAutoComplete } from "../types/CommandAutoComplete";

// TODO: CREATE BASE CLASS FOR COMMANDS & EXTEND IT FOR BUILDERS
export class Command {
  name: string;
  builder: SlashCommandBuilder;
  handler: (interaction: CommandInteraction) => void;
  autoComplete?: CommandAutoComplete;

  constructor({ name, builder, handler, autoComplete }: Command) {
    this.name = name;
    this.builder = builder;
    this.handler = handler;
    this.autoComplete = autoComplete;
  }
}

export class ContextMenuCommand {
  name: string;
  builder: ContextMenuCommandBuilder;
  handler: (interaction: ContextMenuCommandInteraction) => void;
  type: ApplicationCommandType;

  constructor({ name, builder, handler, type }: ContextMenuCommand) {
    this.name = name;
    this.builder = builder;
    this.handler = handler;
    this.type = type;
  }
}
