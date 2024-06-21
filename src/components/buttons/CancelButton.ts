import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { Button } from "@/lib/classes";

const BUTTON_ID = "cancel";
const BUTTON_LABEL = "Cancel";
const BUTTON_STYLE = ButtonStyle.Danger;

export default new Button({
  id: BUTTON_ID,
  builder: new ButtonBuilder()
    .setCustomId(BUTTON_ID)
    .setStyle(BUTTON_STYLE)
    .setLabel(BUTTON_LABEL),
  handler: async (interaction: ButtonInteraction) => {
    interaction.message.edit({
      content: "Canceled!",
      components: []
    });
  }
});
