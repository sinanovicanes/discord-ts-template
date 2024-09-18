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
import { ComponentKind } from "../enums";

@singleton()
export class ComponentManager {
  private readonly logger = new Logger(ComponentManager.name);
  private components: Record<
    ComponentKind,
    Map<ComponentBase["customId"], ComponentBase>
  > = {
    [ComponentKind.BUTTON]: new Map(),
    [ComponentKind.MODAL]: new Map(),
    [ComponentKind.STRING_SELECT_MENU]: new Map(),
    [ComponentKind.USER_SELECT_MENU]: new Map(),
    [ComponentKind.ROLE_SELECT_MENU]: new Map(),
    [ComponentKind.CHANNEL_SELECT_MENU]: new Map(),
    [ComponentKind.MENTIONABLE_SELECT_MENU]: new Map()
  };

  constructor() {
    this.initialize().catch(e => this.logger.error(e));
  }

  async initialize() {
    this.components = await loadComponents();
    this.logger.info(`${Object.keys(this.components).length} components loaded`);
  }

  getButton(customId: ComponentBase["customId"]) {
    return this.components.button.get(customId);
  }

  getModal(customId: ComponentBase["customId"]) {
    return this.components.modal.get(customId);
  }

  getSelectMenuFromInteraction(interaction: AnySelectMenuInteraction) {
    switch (true) {
      case interaction.isStringSelectMenu():
        return this.components.stringSelectMenu.get(interaction.customId);
      case interaction.isUserSelectMenu():
        return this.components.userSelectMenu.get(interaction.customId);
      case interaction.isRoleSelectMenu():
        return this.components.roleSelectMenu.get(interaction.customId);
      case interaction.isChannelSelectMenu():
        return this.components.channelSelectMenu.get(interaction.customId);
      case interaction.isMentionableSelectMenu():
        return this.components.mentionableSelectMenu.get(interaction.customId);
      default:
        return null;
    }
  }

  hasButton(customId: ComponentBase["customId"]) {
    return this.components.button.has(customId);
  }

  hasModal(customId: ComponentBase["customId"]) {
    return this.components.modal.has(customId);
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
    this.handleButtonInteraction(interaction).catch(e => this.logger.error(e));
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
    this.handleModalSubmitInteraction(interaction).catch(e => this.logger.error(e));
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
    this.handleSelectMenuInteraction(interaction).catch(e => this.logger.error(e));
  }
}
