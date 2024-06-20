import { ModalSubmitInteraction } from "discord.js";
import { InteractionCreateEvent } from "@lib/classes";
import { ModalManager } from "@lib/managers";

class HandleModal extends InteractionCreateEvent {
  async handler(interaction: ModalSubmitInteraction) {
    if (!interaction.isModalSubmit()) return;

    ModalManager.onModalSubmitInteraction(interaction);
  }
}

export default new HandleModal();
