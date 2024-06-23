import { ModalComponent } from "@/lib/classes/components";
import {
  ActionRowBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle
} from "discord.js";
import { singleton } from "tsyringe";

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

@singleton()
class ExampleModal extends ModalComponent {
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

    interaction.reply({
      content: "Thanks for submitting!",
      ephemeral: true
    });
  }
}

export default ExampleModal;
