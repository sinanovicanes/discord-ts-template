import { ButtonComponent } from "@/lib/classes/components";
import { ButtonInteraction, ButtonStyle } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class CancelButton extends ButtonComponent {
  customId = "cancel";
  label = "Cancel";
  style = ButtonStyle.Danger;

  handler(interaction: ButtonInteraction) {
    interaction.message.edit({
      content: "Canceled!",
      components: []
    });
  }
}

export default CancelButton;
