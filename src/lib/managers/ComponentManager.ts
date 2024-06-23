import components from "@/components";
import {
  ButtonComponent,
  ComponentBase,
  MentionableSelectMenuComponent,
  ModalComponent,
  RoleSelectMenuComponent,
  StringSelectMenuComponent,
  UserSelectMenuComponent
} from "@/lib/classes/components";
import {
  ButtonNotFound,
  FailedToHandleButton,
  FailedToHandleModal,
  FailedToHandleSelectMenu,
  ModalNotFound,
  SelectMenuNotFound
} from "@/lib/errors";
import {
  AnySelectMenuInteraction,
  ButtonInteraction,
  ChannelSelectMenuComponent,
  ModalSubmitInteraction
} from "discord.js";
import { container, singleton } from "tsyringe";

function mapComponents(
  getCtors: () => (new () => ComponentBase)[]
): Map<ComponentBase["customId"], ComponentBase> {
  return new Map(
    getCtors().map(ctor => {
      const instance = container.resolve(ctor);

      return [instance.customId, instance];
    })
  );
}

function getButtons<T = new () => ButtonComponent>(): T[] {
  return components.filter(
    component => component.prototype instanceof ButtonComponent
  ) as T[];
}

function getModals<T = new () => ModalComponent>(): T[] {
  return components.filter(
    component => component.prototype instanceof ModalComponent
  ) as T[];
}

function getStringSelectMenus<T = new () => StringSelectMenuComponent>(): T[] {
  return components.filter(
    component => component.prototype instanceof StringSelectMenuComponent
  ) as T[];
}

function getUserSelectMenus<T = new () => UserSelectMenuComponent>(): T[] {
  return components.filter(
    component => component.prototype instanceof UserSelectMenuComponent
  ) as T[];
}

function getRoleSelectMenus<T = new () => RoleSelectMenuComponent>(): T[] {
  return components.filter(
    component => component.prototype instanceof RoleSelectMenuComponent
  ) as T[];
}

function getChannelSelectMenus<T = new () => ChannelSelectMenuComponent>(): T[] {
  return components.filter(
    component => component.prototype instanceof ChannelSelectMenuComponent
  ) as T[];
}

function getMentionableSelectMenus<T = new () => MentionableSelectMenuComponent>(): T[] {
  return components.filter(
    component => component.prototype instanceof MentionableSelectMenuComponent
  ) as T[];
}

@singleton()
export class ComponentManager {
  components: Record<string, Map<ComponentBase["customId"], ComponentBase>> = {
    buttons: mapComponents(getButtons),
    modals: mapComponents(getModals),
    stringSelectMenus: mapComponents(getStringSelectMenus),
    userSelectMenus: mapComponents(getUserSelectMenus),
    roleSelectMenus: mapComponents(getRoleSelectMenus),
    channelSelectMenus: mapComponents(getChannelSelectMenus),
    mentionableSelectMenus: mapComponents(getMentionableSelectMenus)
  };

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

  async onSelectMenuInteraction(interaction: AnySelectMenuInteraction) {
    const selectMenu = this.getSelectMenuFromInteraction(interaction);

    if (!selectMenu) throw new SelectMenuNotFound(interaction);

    try {
      await selectMenu.handler(interaction);
    } catch (error) {
      throw new FailedToHandleSelectMenu(interaction);
    }
  }
}
