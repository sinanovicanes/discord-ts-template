import { ComponentManager, InteractionCreateEvent } from "@app/common";
import { ModalSubmitInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
export default class HandleModal extends InteractionCreateEvent {
  constructor(private readonly componentManager: ComponentManager) {
    super();
  }

  handler(interaction: ModalSubmitInteraction) {
    if (!interaction.isModalSubmit()) return;

    this.componentManager.onModalSubmitInteraction(interaction);
  }
}
