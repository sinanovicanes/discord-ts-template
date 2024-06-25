import {
  ChannelSelectMenu,
  MentionableSelectMenu,
  RoleSelectMenu,
  StringSelectMenu,
  UserSelectMenu
} from "@/components";
import { SelectMenus, SlashCommand } from "@/lib/classes";
import { ActionRowBuilder, ChatInputCommandInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class SelectMenuCommand extends SlashCommand {
  name = "select_menu";
  description = "Select menu examples";
  rows: ActionRowBuilder<SelectMenus>[];

  constructor(
    private readonly stringSelectMenu: StringSelectMenu,
    private readonly userSelectMenu: UserSelectMenu,
    private readonly roleSelectMenu: RoleSelectMenu,
    private readonly channelSelectMenu: ChannelSelectMenu,
    private readonly mentionableSelectMenu: MentionableSelectMenu
  ) {
    super();

    this.rows = [
      stringSelectMenu.toRow(),
      userSelectMenu.toRow(),
      roleSelectMenu.toRow(),
      channelSelectMenu.toRow(),
      mentionableSelectMenu.toRow()
    ];
  }

  async handler(interaction: ChatInputCommandInteraction) {
    await interaction.reply({
      content: "Select menu examples:",
      components: this.rows,
      ephemeral: true
    });
  }
}

export default SelectMenuCommand;
