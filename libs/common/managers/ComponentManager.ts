import { ComponentBase } from "../classes/components";
import {
  ButtonNotFound,
  FailedToHandleButton,
  FailedToHandleModal,
  FailedToHandleSelectMenu,
  ModalNotFound,
  SelectMenuNotFound
} from "../errors";
import {
  AnySelectMenuInteraction,
  ButtonInteraction,
  ModalSubmitInteraction
} from "discord.js";
import { singleton } from "tsyringe";
import { loadComponents } from "../utils/loaders";
import { Logger } from "../classes";

@singleton()
export class ComponentManager {
  private readonly logger = new Logger(ComponentManager.name);
  components: Record<string, Map<ComponentBase["customId"], ComponentBase>> =
    loadComponents();

  getButton(customId: ComponentBase["customId"]) {
    return this.components.buttons.get(customId);
  }

  getModal(customId: ComponentBase["customId"]) {
    return this.components.modals.get(customId);
  }

  getSelectMenuFromInteraction(interaction: AnySelectMenuInteraction) {
    switch (true) {
      case interaction.isStringSelectMenu():
        return this.components.stringSelectMenus.get(interaction.customId);
      case interaction.isUserSelectMenu():
        return this.components.userSelectMenus.get(interaction.customId);
      case interaction.isRoleSelectMenu():
        return this.components.roleSelectMenus.get(interaction.customId);
      case interaction.isChannelSelectMenu():
        return this.components.channelSelectMenus.get(interaction.customId);
      case interaction.isMentionableSelectMenu():
        return this.components.mentionableSelectMenus.get(interaction.customId);
      default:
        return null;
    }
  }

  hasButton(customId: ComponentBase["customId"]) {
    return this.components.buttons.has(customId);
  }

  hasModal(customId: ComponentBase["customId"]) {
    return this.components.modals.has(customId);
  }

  private async handleButtonInteraction(interaction: ButtonInteraction) {
    const button = this.getButton(interaction.customId);

    if (!button) throw new ButtonNotFound(interaction);

    try {
      await button.handler(interaction);
    } catch (error) {
      throw new FailedToHandleButton(interaction);
    }
  }

  onButtonInteraction(interaction: ButtonInteraction) {
    this.handleButtonInteraction(interaction).catch(this.logger.error);
  }

  private async handleModalSubmitInteraction(interaction: ModalSubmitInteraction) {
    const modal = this.getModal(interaction.customId);

    if (!modal) throw new ModalNotFound(interaction);

    try {
      await modal.handler(interaction);
    } catch (error) {
      throw new FailedToHandleModal(interaction);
    }
  }

  onModalSubmitInteraction(interaction: ModalSubmitInteraction) {
    this.handleModalSubmitInteraction(interaction).catch(this.logger.error);
  }

  private async handleSelectMenuInteraction(interaction: AnySelectMenuInteraction) {
    const selectMenu = this.getSelectMenuFromInteraction(interaction);

    if (!selectMenu) throw new SelectMenuNotFound(interaction);

    try {
      await selectMenu.handler(interaction);
    } catch (error) {
      throw new FailedToHandleSelectMenu(interaction);
    }
  }

  onSelectMenuInteraction(interaction: AnySelectMenuInteraction) {
    this.handleSelectMenuInteraction(interaction).catch(this.logger.error);
  }
}
