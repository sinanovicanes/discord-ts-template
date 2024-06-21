import { ModalSubmitInteraction } from "discord.js";
import { InteractionCreateEvent } from "@/lib/classes";
import { ComponentManager } from "@/lib/managers";
import { Client } from "@/lib/client";

class HandleModal extends InteractionCreateEvent {
  constructor(private readonly client: Client) {
    super();
  }

  async handler(interaction: ModalSubmitInteraction) {
    if (!interaction.isModalSubmit()) return;

    ComponentManager.onModalSubmitInteraction(interaction);
  }
}

export default HandleModal;
