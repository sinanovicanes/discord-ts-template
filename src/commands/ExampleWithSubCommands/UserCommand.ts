import { SlashCommand } from "@/lib/classes";
import { CommandInteraction } from "discord.js";
import { singleton } from "tsyringe";
import UserSubGroup from "./UserSubGroup";

@singleton()
class UserCommand extends SlashCommand {
  name = "user";
  description = "User related commands";

  constructor(private readonly userSubGroup: UserSubGroup) {
    super();
    this.addSubcommandGroup(userSubGroup);
  }

  async handler(interaction: CommandInteraction) {
    await interaction.reply("I don't know what to do with this command.");
  }
}

export default UserCommand;
