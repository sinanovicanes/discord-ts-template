import { Injectable, ModalComponent } from "@app/common";
import {
  ActionRowBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle
} from "discord.js";

const favoriteColorInput = new TextInputBuilder()
  .setCustomId("favorite_color")
  .setLabel("Favorite Color")
  .setStyle(TextInputStyle.Short)
  .setPlaceholder("Enter your favorite color here");
const hobbiesInput = new TextInputBuilder()
  .setCustomId("hobbies")
  .setLabel("Hobbies")
  .setStyle(TextInputStyle.Paragraph)
  .setPlaceholder("Enter your hobbies here");

const rows = [
  new ActionRowBuilder<TextInputBuilder>({ components: [favoriteColorInput] }),
  new ActionRowBuilder<TextInputBuilder>({ components: [hobbiesInput] })
];

@Injectable()
export class ExampleModal extends ModalComponent {
  constructor() {
    super({
      customId: "example_modal",
      title: "Example Modal",
      components: rows
    });
  }

  async handler(interaction: ModalSubmitInteraction) {
    const favoriteColor = interaction.fields.getTextInputValue("favorite_color");
    const hobbies = interaction.fields.getTextInputValue("hobbies");

    await interaction.reply({
      content:
        `Your favorite color is ${favoriteColor} and your hobbies are: ${hobbies}`.trim(),
      ephemeral: true
    });
  }
}
