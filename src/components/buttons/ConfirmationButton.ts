import { ButtonComponent } from "@/lib/classes/components";
import { ButtonInteraction, ButtonStyle } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class ConfirmationButton extends ButtonComponent {
  constructor() {
    super({
      customId: "confirm_button",
      label: "Confirm",
      style: ButtonStyle.Success
    });
  }

  handler(interaction: ButtonInteraction) {
    interaction.message.edit({
      content: "Confirmed!",
      components: []
    });
  }
}

export default ConfirmationButton;
