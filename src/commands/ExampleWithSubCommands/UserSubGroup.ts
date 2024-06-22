import { SubCommandGroup } from "@/lib/classes";
import { ChatInputCommandInteraction } from "discord.js";
import { singleton } from "tsyringe";
import InfoSubCommand from "./InfoSub";
import RoleSubCommand from "./RoleSub";

@singleton()
class UserSubGroup extends SubCommandGroup {
  name = "info";
  description = "Get user info";

  constructor(
    private readonly subInfoCommand: InfoSubCommand,
    private readonly subRoleCommand: RoleSubCommand
  ) {
    super();
    this.addSubcommand(subInfoCommand).addSubcommand(subRoleCommand);
  }

  async handler(interaction: ChatInputCommandInteraction) {
    await interaction.reply(interaction.user.toString());
  }
}

export default UserSubGroup;
