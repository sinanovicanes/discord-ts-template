import fs from "fs";
import path from "path";
import { container } from "tsyringe";
import {
  ButtonComponent,
  ChannelSelectMenuComponent,
  ComponentBase,
  MentionableSelectMenuComponent,
  ModalComponent,
  RoleSelectMenuComponent,
  StringSelectMenuComponent,
  UserSelectMenuComponent
} from "../../classes/components";
import { ComponentKind } from "@app/common";
import env from "../env";

const COMPONENTS_PATH =
  env.NODE_ENV === "production"
    ? path.join(process.cwd(), "build", "src", "components")
    : path.join(process.cwd(), "src", "components");

function getComponentKind(component: ComponentBase): ComponentKind | null {
  switch (true) {
    case component instanceof ButtonComponent:
      return ComponentKind.BUTTON;
    case component instanceof ModalComponent:
      return ComponentKind.MODAL;
    case component instanceof StringSelectMenuComponent:
      return ComponentKind.STRING_SELECT_MENU;
    case component instanceof UserSelectMenuComponent:
      return ComponentKind.USER_SELECT_MENU;
    case component instanceof RoleSelectMenuComponent:
      return ComponentKind.ROLE_SELECT_MENU;
    case component instanceof ChannelSelectMenuComponent:
      return ComponentKind.CHANNEL_SELECT_MENU;
    case component instanceof MentionableSelectMenuComponent:
      return ComponentKind.MENTIONABLE_SELECT_MENU;
    default:
      return null;
  }
}

const readComponentsDirectroy = async (
  _path: string
): Promise<Record<ComponentKind, Map<ComponentBase["customId"], ComponentBase>>> => {
  return new Promise((resolve, reject) => {
    const components: Record<
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

    fs.readdir(_path, async (err, files) => {
      if (err) {
        return reject(`Failed to read components directory: ${_path}`);
      }

      for (const file of files) {
        const filePath = path.join(_path, file);

        if (file.endsWith(".ts") || file.endsWith(".js")) {
          try {
            const component = await import(filePath);

            for (const key in component) {
              const componentKind = getComponentKind(component[key].prototype);

              if (!componentKind) continue;

              const instance: ComponentBase = container.resolve(component[key]);

              components[componentKind].set(instance.customId, instance);
            }
          } catch (e) {
            console.error(`Failed to load component: ${file}\n${e}`);
          }
        }

        resolve(components);
      }
    });
  });
};

export async function loadComponents(): Promise<
  Record<ComponentKind, Map<ComponentBase["customId"], ComponentBase>>
> {
  const components = await readComponentsDirectroy(COMPONENTS_PATH);

  return components;
}
