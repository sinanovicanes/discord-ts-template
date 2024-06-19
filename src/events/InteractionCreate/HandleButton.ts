import { ButtonInteraction, Events } from "discord.js";
import { Event } from "../../classes/event";
import { ButtonManager } from "../../managers/ButtonManager";

class HandleButton implements Event {
  event: Events = Events.InteractionCreate;
  once = false;

  async execute(interaction: ButtonInteraction) {
    if (!interaction.isButton()) return;

    ButtonManager.onButtonInteraction(interaction);
  }
}

export default new HandleButton();
