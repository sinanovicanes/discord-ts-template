import { ButtonComponent, Injectable } from "@app/common";
import { ButtonInteraction, ButtonStyle } from "discord.js";

@Injectable()
export class ConfirmationButton extends ButtonComponent {
  constructor() {
    super({
      customId: "confirm_button",
      label: "Confirm",
      style: ButtonStyle.Success
    });
  }

  async handler(interaction: ButtonInteraction) {
    await interaction.message.edit({
      content: "Confirmed!",
      components: []
    });
  }
}
