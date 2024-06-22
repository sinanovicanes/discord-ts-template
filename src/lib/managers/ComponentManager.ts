import buttons from "@/components/buttons";
import modals from "@/components/modals";
import { ButtonInteraction, ModalSubmitInteraction } from "discord.js";
import { ComponentBase } from "@/lib/classes/components";
import {
  ButtonNotFound,
  FailedToHandleButton,
  FailedToHandleModal,
  ModalNotFound
} from "@/lib/errors";
import { container, singleton } from "tsyringe";

@singleton()
export class ComponentManager {
  components: Record<string, Map<ComponentBase["customId"], ComponentBase>> = {
    buttons: new Map(
      buttons.map(button => {
        const instance = container.resolve(button);
        instance.setStyle(instance.style);
        instance.setCustomId(instance.customId);
        if (instance.label) instance.setLabel(instance.label);
        if (instance.emoji) instance.setEmoji(instance.emoji);
        return [instance.customId, instance];
      })
    ),
    modals: new Map(
      modals.map(modal => {
        const instance = container.resolve(modal);
        instance.setTitle(instance.title);
        instance.setCustomId(instance.customId);
        return [instance.customId, instance];
      })
    )
  };

  getButton(customId: ComponentBase["customId"]) {
    return this.components.buttons.get(customId);
  }

  getModal(customId: ComponentBase["customId"]) {
    return this.components.modals.get(customId);
  }

  hasButton(customId: ComponentBase["customId"]) {
    return this.components.buttons.has(customId);
  }

  hasModal(customId: ComponentBase["customId"]) {
    return this.components.modals.has(customId);
  }

  async onButtonInteraction(interaction: ButtonInteraction) {
    const button = this.getButton(interaction.customId);

    if (!button) throw new ButtonNotFound(interaction);

    try {
      await button.handler(interaction);
    } catch (error) {
      throw new FailedToHandleButton(interaction);
    }
  }

  async onModalSubmitInteraction(interaction: ModalSubmitInteraction) {
    const modal = this.getModal(interaction.customId);

    if (!modal) throw new ModalNotFound(interaction);

    try {
      await modal.handler(interaction);
    } catch (error) {
      throw new FailedToHandleModal(interaction);
    }
  }
}
