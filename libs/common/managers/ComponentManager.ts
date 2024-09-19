import {
  AnySelectMenuInteraction,
  ButtonInteraction,
  ModalSubmitInteraction
} from "discord.js";
import { ComponentBase, ComponentClass } from "../classes/components";
import { Injectable } from "../decorators";
import { ComponentKind } from "../enums";
import {
  ButtonNotFound,
  FailedToHandleButton,
  FailedToHandleModal,
  FailedToHandleSelectMenu,
  GuardError,
  MiddlewareError,
  ModalNotFound,
  SelectMenuNotFound
} from "../errors";
import { pluralify } from "../utils";
import { loadComponents } from "../utils/loaders";
import { BaseManager } from "./BaseManager";

@Injectable()
export class ComponentManager extends BaseManager {
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

  async initialize() {
    this.components = await loadComponents();
    const length = Object.keys(this.components).length;

    this.logger.info(`${length} ${pluralify("component", "components", length)} loaded`);
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
    const button = this.getButton(interaction.customId) as ComponentClass | undefined;

    if (!button) throw new ButtonNotFound(interaction);

    try {
      await this.middlewareExecutor.execute(button, interaction);
      await button.handler(interaction);
    } catch (error) {
      if (error instanceof GuardError || error instanceof MiddlewareError) return;
      throw new FailedToHandleButton(interaction);
    }
  }

  onButtonInteraction(interaction: ButtonInteraction) {
    this.handleButtonInteraction(interaction).catch(e => this.logger.error(e));
  }

  private async handleModalSubmitInteraction(interaction: ModalSubmitInteraction) {
    const modal = this.getModal(interaction.customId) as ComponentClass | undefined;

    if (!modal) throw new ModalNotFound(interaction);

    try {
      await this.middlewareExecutor.execute(modal, interaction);
      await modal.handler(interaction);
    } catch (error) {
      if (error instanceof GuardError || error instanceof MiddlewareError) return;
      throw new FailedToHandleModal(interaction);
    }
  }

  onModalSubmitInteraction(interaction: ModalSubmitInteraction) {
    this.handleModalSubmitInteraction(interaction).catch(e => this.logger.error(e));
  }

  private async handleSelectMenuInteraction(interaction: AnySelectMenuInteraction) {
    const selectMenu = this.getSelectMenuFromInteraction(interaction) as
      | ComponentClass
      | undefined;

    if (!selectMenu) throw new SelectMenuNotFound(interaction);

    try {
      await this.middlewareExecutor.execute(selectMenu, interaction);
      await selectMenu.handler(interaction);
    } catch (error) {
      if (error instanceof GuardError || error instanceof MiddlewareError) return;
      throw new FailedToHandleSelectMenu(interaction);
    }
  }

  onSelectMenuInteraction(interaction: AnySelectMenuInteraction) {
    this.handleSelectMenuInteraction(interaction).catch(e => this.logger.error(e));
  }
}
