import { ButtonInteraction } from "discord.js";
import { ButtonManager } from "../../../managers/ButtonManager";
import { InteractionCreateEvent } from "../InteractionCreateEvent";

class HandleButton extends InteractionCreateEvent {
  async execute(interaction: ButtonInteraction) {
    if (!interaction.isButton()) return;

    ButtonManager.onButtonInteraction(interaction);
  }
}

export default new HandleButton();
