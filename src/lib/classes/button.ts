import { ButtonInteraction, ButtonBuilder } from "discord.js";

export class Button {
  id: string;
  builder: ButtonBuilder;
  execute: (interaction: ButtonInteraction) => void;

  constructor({ id, builder, execute }: Button) {
    this.id = id;
    this.builder = builder;
    this.execute = execute;
  }
}
