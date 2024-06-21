import {
  ActionRowBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle
} from "discord.js";
import { Modal } from "@/lib/classes/modal";

const MODAL_ID = "example";
const MODAL_TITLE = "Example Modal";

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

export default new Modal({
  id: MODAL_ID,
  builder: new ModalBuilder()
    .setCustomId(MODAL_ID)
    .setTitle(MODAL_TITLE)
    .addComponents(rows),
  execute: async (interaction: ModalSubmitInteraction) => {
    const favoriteColor = interaction.fields.getTextInputValue("favorite_color");
    const hobbies = interaction.fields.getTextInputValue("hobbies");

    interaction.reply({
      content: "Thanks for submitting!",
      ephemeral: true
    });
  }
});
