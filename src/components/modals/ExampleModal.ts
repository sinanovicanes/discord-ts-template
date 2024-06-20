import {
  ActionRowBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle
} from "discord.js";
import { Modal } from "@lib/classes/modal";

const MODAL_ID = "example";
const MODAL_TITLE = "Example Modal";

const FavoriteColorInput = new TextInputBuilder()
  .setCustomId("favorite_color")
  .setLabel("Favorite Color")
  .setStyle(TextInputStyle.Short)
  .setPlaceholder("Enter your favorite color here");
const hobbiesInput = new TextInputBuilder()
  .setCustomId("hobbies")
  .setLabel("Hobbies")
  .setStyle(TextInputStyle.Paragraph)
  .setPlaceholder("Enter your hobbies here");

const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
  FavoriteColorInput
);
const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
  hobbiesInput
);

export default new Modal({
  id: MODAL_ID,
  builder: new ModalBuilder()
    .setCustomId(MODAL_ID)
    .setTitle(MODAL_TITLE)
    .addComponents(firstActionRow, secondActionRow),
  execute: async (interaction: ModalSubmitInteraction) => {
    console.log(interaction.fields.getTextInputValue("favorite_color"));
  }
});
