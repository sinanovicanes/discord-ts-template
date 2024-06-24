import { SlashCommand } from "@/lib/classes";
import { ChatInputCommandInteraction } from "discord.js";
import { singleton } from "tsyringe";
import InfoSubCommand from "./InfoSub";
import UserSubGroup from "./UserSubGroup";

@singleton()
class UserCommand extends SlashCommand {
  name = "user";
  description = "User related commands";

  constructor(
    private readonly info: InfoSubCommand,
    private readonly userSubGroup: UserSubGroup
  ) {
    super();
    this.addSubcommand(info).addSubcommandGroup(userSubGroup);
  }

  async handler(interaction: ChatInputCommandInteraction) {
    await interaction.reply("I don't know what to do with this command.");
  }
}

export default UserCommand;
