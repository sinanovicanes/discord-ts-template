import { ContextMenuCommand } from "@/lib/classes";
import { Client } from "@/lib/client";
import {
  ApplicationCommandType,
  ContextMenuCommandInteraction,
  ContextMenuCommandType
} from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class UserInfoCommand extends ContextMenuCommand {
  name = "user-info";
  type = ApplicationCommandType.User as ContextMenuCommandType;

  constructor(private readonly client: Client) {
    super();
  }

  async handler(interaction: ContextMenuCommandInteraction) {
    const targetId = interaction.targetId;

    await interaction.reply({
      content: `Okay, here's the user info: ${targetId}`,
      ephemeral: true
    });
  }
}

export default UserInfoCommand;
