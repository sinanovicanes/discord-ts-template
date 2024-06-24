import { UserContextMenuCommand } from "@/lib/classes";
import { UserContextMenuCommandInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class UserContextCommand extends UserContextMenuCommand {
  name = "user-info";

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

export default UserContextCommand;
