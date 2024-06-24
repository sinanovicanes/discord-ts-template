import { SlashCommand } from "@/lib/classes";
import { ChatInputCommandInteraction } from "discord.js";
import { singleton } from "tsyringe";
import UserSubGroup from "./UserSubGroup";

@singleton()
class UserCommand extends SlashCommand {
  name = "user";
  description = "User related commands";

  constructor(userSubGroup: UserSubGroup) {
    super({
      subCommandGroup: userSubGroup
    });
  }

  async handler(interaction: ChatInputCommandInteraction) {
    await interaction.reply("I don't know what to do with this command.");
  }
}

export default UserCommand;
