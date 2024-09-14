import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChannelSelectMenuBuilder,
  ChannelSelectMenuInteraction,
  ChannelType,
  CommandInteraction,
  ComponentEmojiResolvable,
  MentionableSelectMenuBuilder,
  MentionableSelectMenuInteraction,
  MessageComponentInteraction,
  ModalBuilder,
  ModalSubmitInteraction,
  RoleSelectMenuBuilder,
  RoleSelectMenuInteraction,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  TextInputBuilder,
  UserSelectMenuBuilder,
  UserSelectMenuInteraction
} from "discord.js";

export type SelectMenus =
  | StringSelectMenuComponent
  | UserSelectMenuComponent
  | RoleSelectMenuComponent
  | ChannelSelectMenuComponent
  | MentionableSelectMenuComponent;

type ComponentInteractions =
  | ButtonInteraction
  | ModalSubmitInteraction
  | StringSelectMenuInteraction
  | UserSelectMenuInteraction
  | RoleSelectMenuInteraction
  | ChannelSelectMenuInteraction
  | MentionableSelectMenuInteraction;

export interface ComponentBase {
  customId: string;
  handler(interaction: ComponentInteractions): void;
}

type ComponentPropsBase = Omit<ComponentBase, "handler">;

export interface ButtonProps extends ComponentPropsBase {
  label?: string;
  emoji?: ComponentEmojiResolvable;
  style?: Exclude<ButtonStyle, ButtonStyle.Link>;
}

export abstract class ButtonComponent extends ButtonBuilder implements ComponentBase {
  customId: string;
  abstract handler(interaction: ButtonInteraction): void;

  constructor({ customId, label, emoji, style = ButtonStyle.Primary }: ButtonProps) {
    super({
      custom_id: customId,
      label,
      emoji,
      style
    });

    this.customId = customId;
  }

  toRow(...additionalButtons: ButtonComponent[]) {
    return new ActionRowBuilder<ButtonComponent>().addComponents(
      this,
      ...additionalButtons
    );
  }
}

export interface ModalProps extends ComponentPropsBase {
  title: string;
  components: ActionRowBuilder<TextInputBuilder>[];
}

export abstract class ModalComponent extends ModalBuilder implements ComponentBase {
  customId: string;
  abstract handler(interaction: ModalSubmitInteraction): void;

  constructor({ customId, title, components }: ModalProps) {
    super({
      custom_id: customId,
      title,
      components
    });

    this.customId = customId;
  }

  async show(interaction: CommandInteraction | MessageComponentInteraction) {
    await interaction.showModal(this);
    return this;
  }
}

export interface StringSelectMenuOption {
  label: string;
  value: string;
  description?: string;
  default?: boolean;
}

export interface StringSelectMenuProps {
  customId: string;
  placeholder?: string;
  options: StringSelectMenuOption[];
}

export abstract class StringSelectMenuComponent
  extends StringSelectMenuBuilder
  implements ComponentBase
{
  customId: string;
  abstract handler(interaction: StringSelectMenuInteraction): void;

  constructor({ customId, placeholder, options }: StringSelectMenuProps) {
    super({
      custom_id: customId,
      placeholder,
      options
    });

    this.customId = customId;
  }

  toRow(...additionalMenus: this[]) {
    return new ActionRowBuilder<this>().addComponents(this, ...additionalMenus);
  }
}

export interface UserSelectMenuProps extends ComponentPropsBase {
  placeholder?: string;
  defaultUsers?: string[];
  maxValues?: number;
  minValues?: number;
}

export abstract class UserSelectMenuComponent
  extends UserSelectMenuBuilder
  implements ComponentBase
{
  customId: string;
  abstract handler(interaction: UserSelectMenuInteraction): void;

  constructor({
    customId,
    placeholder,
    defaultUsers,
    maxValues,
    minValues
  }: UserSelectMenuProps) {
    super({
      custom_id: customId,
      placeholder,
      max_values: maxValues,
      min_values: minValues
    });

    this.customId = customId;
    if (defaultUsers) this.setDefaultUsers(defaultUsers);
  }

  toRow(...additionalMenus: this[]) {
    return new ActionRowBuilder<this>().addComponents(this, ...additionalMenus);
  }
}

export interface RoleSelectMenuProps extends ComponentPropsBase {
  placeholder?: string;
  defaultRoles?: string[];
  maxValues?: number;
  minValues?: number;
}

export abstract class RoleSelectMenuComponent
  extends RoleSelectMenuBuilder
  implements ComponentBase
{
  customId: string;
  abstract handler(interaction: RoleSelectMenuInteraction): void;

  constructor({
    customId,
    defaultRoles,
    maxValues,
    minValues,
    placeholder
  }: RoleSelectMenuProps) {
    super({
      custom_id: customId,
      placeholder,
      max_values: maxValues,
      min_values: minValues
    });

    this.customId = customId;
    if (defaultRoles) this.setDefaultRoles(defaultRoles);
  }

  toRow(...additionalMenus: this[]) {
    return new ActionRowBuilder<this>().addComponents(this, ...additionalMenus);
  }
}

export interface ChannelSelectMenuProps extends ComponentPropsBase {
  placeholder?: string;
  defaultChannels?: string[];
  maxValues?: number;
  minValues?: number;
  channelTypes?: ChannelType[];
}

export abstract class ChannelSelectMenuComponent
  extends ChannelSelectMenuBuilder
  implements ComponentBase
{
  customId: string;
  abstract handler(interaction: ChannelSelectMenuInteraction): void;

  constructor({
    customId,
    defaultChannels,
    maxValues,
    minValues,
    placeholder,
    channelTypes
  }: ChannelSelectMenuProps) {
    //TODO: ADD CHANNEL TYPES
    super({
      custom_id: customId,
      placeholder,
      max_values: maxValues,
      min_values: minValues,
      channel_types: channelTypes
    });

    this.customId = customId;
    if (defaultChannels) this.setDefaultChannels(defaultChannels);
  }

  toRow(...additionalMenus: this[]) {
    return new ActionRowBuilder<this>().addComponents(this, ...additionalMenus);
  }
}

export interface MentionableSelectMenuProps extends ComponentPropsBase {
  placeholder?: string;
  maxValues?: number;
  minValues?: number;
}

export abstract class MentionableSelectMenuComponent
  extends MentionableSelectMenuBuilder
  implements ComponentBase
{
  customId: string;
  abstract handler(interaction: MentionableSelectMenuInteraction): void;

  constructor({
    customId,
    maxValues,
    minValues,
    placeholder
  }: MentionableSelectMenuProps) {
    super({
      custom_id: customId,
      max_values: maxValues,
      min_values: minValues,
      placeholder
    });

    this.customId = customId;
  }

  toRow(...additionalMenus: this[]) {
    return new ActionRowBuilder<this>().addComponents(this, ...additionalMenus);
  }
}
