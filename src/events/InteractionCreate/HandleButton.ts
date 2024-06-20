import { ButtonInteraction } from "discord.js";
import { InteractionCreateEvent } from "../../classes/event";
import { ButtonManager } from "../../managers/ButtonManager";

class HandleButton extends InteractionCreateEvent {
  async handler(interaction: ButtonInteraction) {
    if (!interaction.isButton()) return;

    ButtonManager.onButtonInteraction(interaction);
  }
}

export default new HandleButton();
