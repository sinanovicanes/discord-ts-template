import { ButtonComponent } from "@app/common";
import { ButtonInteraction, ButtonStyle } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
export class CancelButton extends ButtonComponent {
  constructor() {
    super({
      customId: "cancel_button",
      label: "Cancel",
      style: ButtonStyle.Danger
    });
  }

  async handler(interaction: ButtonInteraction) {
    await interaction.message.edit({
      content: "Canceled!",
      components: []
    });
  }
}
