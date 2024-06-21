import { ButtonInteraction, ButtonBuilder } from "discord.js";

// TODO: CREATE BASE CLASS FOR COMPONENTS

export class Button {
  id: string;
  builder: ButtonBuilder;
  handler: (interaction: ButtonInteraction) => void;

  constructor({ id, builder, handler }: Button) {
    this.id = id;
    this.builder = builder;
    this.handler = handler;
  }
}
