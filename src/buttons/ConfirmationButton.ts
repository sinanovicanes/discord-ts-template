import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { Button } from "../classes";

const BUTTON_ID = "confirmation";
const BUTTON_LABEL = "Confirm";
const BUTTON_STYLE = ButtonStyle.Success;

export default new Button({
  id: BUTTON_ID,
  builder: new ButtonBuilder()
    .setCustomId(BUTTON_ID)
    .setStyle(BUTTON_STYLE)
    .setLabel(BUTTON_LABEL),
  execute: async (interaction: ButtonInteraction) => {
    interaction.message.edit({
      content: "Confirmed!",
      components: []
    });
  }
});
