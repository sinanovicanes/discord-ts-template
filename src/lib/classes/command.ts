import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Button } from "./button";
import { CommandAutoComplete } from "../types/CommandAutoComplete";

export class Command {
  name: string;
  builder: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => void;
  autoComplete?: CommandAutoComplete;

  constructor({ name, builder, execute, autoComplete }: Command) {
    this.name = name;
    this.builder = builder;
    this.execute = execute;
    this.autoComplete = autoComplete;
  }
}
