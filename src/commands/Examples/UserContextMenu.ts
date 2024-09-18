import { Injectable, UserContextMenuCommand } from "@app/common";
import { UserContextMenuCommandInteraction } from "discord.js";

@Injectable()
class SelectUserContextCommand extends UserContextMenuCommand {
  name = "select-user";

  constructor() {
    super();
  }

  async handler(interaction: UserContextMenuCommandInteraction) {
    const target = interaction.options.getUser("user");

    if (!target) return await interaction.reply("Failed to get user");

    await interaction.reply({
      content: `Selected user: ${target}`,
      ephemeral: true
    });
  }
}

export default SelectUserContextCommand;
