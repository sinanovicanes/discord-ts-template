import components from "@/components";
import {
  ButtonComponent,
  ChannelSelectMenuComponent,
  ComponentBase,
  MentionableSelectMenuComponent,
  ModalComponent,
  RoleSelectMenuComponent,
  StringSelectMenuComponent,
  UserSelectMenuComponent
} from "@/lib/classes";
import { container } from "tsyringe";

export function loadComponents() {
  const componentRecord: Record<string, Map<ComponentBase["customId"], ComponentBase>> = {
    buttons: new Map<ComponentBase["customId"], ComponentBase>(),
    modals: new Map<ComponentBase["customId"], ComponentBase>(),
    stringSelectMenus: new Map<ComponentBase["customId"], ComponentBase>(),
    userSelectMenus: new Map<ComponentBase["customId"], ComponentBase>(),
    roleSelectMenus: new Map<ComponentBase["customId"], ComponentBase>(),
    channelSelectMenus: new Map<ComponentBase["customId"], ComponentBase>(),
    mentionableSelectMenus: new Map<ComponentBase["customId"], ComponentBase>()
  };

  components.forEach((component: new () => ComponentBase) => {
    let componentKey: string | undefined;

    switch (true) {
      case component.prototype instanceof ButtonComponent:
        componentKey = "buttons";
        break;
      case component.prototype instanceof ModalComponent:
        componentKey = "modals";
        break;
      case component.prototype instanceof StringSelectMenuComponent:
        componentKey = "stringSelectMenus";
        break;
      case component.prototype instanceof UserSelectMenuComponent:
        componentKey = "userSelectMenus";
        break;
      case component.prototype instanceof RoleSelectMenuComponent:
        componentKey = "roleSelectMenus";
        break;
      case component.prototype instanceof ChannelSelectMenuComponent:
        componentKey = "channelSelectMenus";
        break;
      case component.prototype instanceof MentionableSelectMenuComponent:
        componentKey = "mentionableSelectMenus";
        break;
    }

    if (!componentKey) return;

    const instance = container.resolve(component);
    componentRecord[componentKey].set(instance.customId, instance);
  });

  return componentRecord;
}
