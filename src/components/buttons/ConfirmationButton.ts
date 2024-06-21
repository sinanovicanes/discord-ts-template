import { ButtonComponent } from "@/lib/classes/components";
import { ButtonInteraction, ButtonStyle } from "discord.js";

class ConfirmationButton extends ButtonComponent {
  customId = "confirmation";
  label = "Confirm";
  style = ButtonStyle.Success;

  handler(interaction: ButtonInteraction) {
    interaction.message.edit({
      content: "Confirmed!",
      components: []
    });
  }
}

export default new ConfirmationButton();
