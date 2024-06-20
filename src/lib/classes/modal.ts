import { ModalBuilder, ModalSubmitInteraction } from "discord.js";

export class Modal {
  id: string;
  builder: ModalBuilder;
  execute: (interaction: ModalSubmitInteraction) => void;

  constructor({ id, builder, execute }: Modal) {
    this.id = id;
    this.builder = builder;
    this.execute = execute;
  }
}
