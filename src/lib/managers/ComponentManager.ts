import buttons from "@/components/buttons";
import modals from "@/components/modals";
import { ButtonInteraction, ModalSubmitInteraction } from "discord.js";
import { ComponentBase } from "../classes/components";
import {
  ButtonNotFound,
  FailedToHandleButton,
  FailedToHandleModal,
  ModalNotFound
} from "../errors";

export class ComponentManager {
  static components: Record<string, Map<ComponentBase["customId"], ComponentBase>> = {
    buttons: new Map(buttons.map(button => [button.customId, button])),
    modals: new Map(modals.map(modal => [modal.customId, modal]))
  };

  static getButton(customId: ComponentBase["customId"]) {
    return this.components.buttons.get(customId);
  }

  static getModal(customId: ComponentBase["customId"]) {
    return this.components.modals.get(customId);
  }

  static hasButton(customId: ComponentBase["customId"]) {
    return this.components.buttons.has(customId);
  }

  static hasModal(customId: ComponentBase["customId"]) {
    return this.components.modals.has(customId);
  }

  static async onButtonInteraction(interaction: ButtonInteraction) {
    const button = this.getButton(interaction.customId);

    if (!button) throw new ButtonNotFound(interaction);

    try {
      await button.handler(interaction);
    } catch (error) {
      throw new FailedToHandleButton(interaction);
    }
  }

  static async onModalSubmitInteraction(interaction: ModalSubmitInteraction) {
    const modal = this.getModal(interaction.customId);

    if (!modal) throw new ModalNotFound(interaction);

    try {
      await modal.handler(interaction);
    } catch (error) {
      throw new FailedToHandleModal(interaction);
    }
  }
}
