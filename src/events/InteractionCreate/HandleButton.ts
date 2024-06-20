import { ButtonInteraction } from "discord.js";
import { InteractionCreateEvent } from "@lib/classes";
import { ButtonManager } from "@lib/managers";

class HandleButton extends InteractionCreateEvent {
  async handler(interaction: ButtonInteraction) {
    if (!interaction.isButton()) return;

    ButtonManager.onButtonInteraction(interaction);
  }
}

export default new HandleButton();
