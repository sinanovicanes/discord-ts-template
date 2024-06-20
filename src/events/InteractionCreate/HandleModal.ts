import { ModalSubmitInteraction } from "discord.js";
import { InteractionCreateEvent } from "../../classes/event";
import { ModalManager } from "../../managers/ModalManager";

class HandleModal extends InteractionCreateEvent {
  async handler(interaction: ModalSubmitInteraction) {
    if (!interaction.isModalSubmit()) return;

    ModalManager.onModalSubmitInteraction(interaction);
  }
}

export default new HandleModal();
