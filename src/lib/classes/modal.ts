import { ModalBuilder, ModalSubmitInteraction } from "discord.js";

// TODO: CREATE BASE CLASS FOR COMPONENTS

export class Modal {
  id: string;
  builder: ModalBuilder;
  handler: (interaction: ModalSubmitInteraction) => void;

  constructor({ id, builder, handler }: Modal) {
    this.id = id;
    this.builder = builder;
    this.handler = handler;
  }
}
