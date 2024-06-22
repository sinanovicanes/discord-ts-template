import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CommandInteraction,
  ComponentEmojiResolvable,
  MessageComponentInteraction,
  ModalBuilder,
  ModalSubmitInteraction
} from "discord.js";

export interface ComponentBase {
  customId: string;
  handler(interaction: ButtonInteraction | ModalSubmitInteraction): void;
}

export abstract class ButtonComponent extends ButtonBuilder implements ComponentBase {
  abstract customId: string;
  label?: string;
  emoji?: ComponentEmojiResolvable;
  style: ButtonStyle = ButtonStyle.Primary;
  abstract handler(interaction: ButtonInteraction): void;
}

export abstract class ModalComponent extends ModalBuilder implements ComponentBase {
  abstract customId: string;
  abstract title: string;
  abstract handler(interaction: ModalSubmitInteraction): void;

  async show(interaction: CommandInteraction | MessageComponentInteraction) {
    await interaction.showModal(this);
    return this;
  }
}
