import { SubCommandGroup } from "@/lib/classes";
import { ChatInputCommandInteraction } from "discord.js";
import { singleton } from "tsyringe";
import InfoSubCommand from "./GetId";
import RoleSubCommand from "./RoleSub";

@singleton()
class UserSubGroup extends SubCommandGroup {
  name = "info";
  description = "User Information Group";

  constructor(subInfoCommand: InfoSubCommand, subRoleCommand: RoleSubCommand) {
    super(subInfoCommand, subRoleCommand);
  }

  async handler(interaction: ChatInputCommandInteraction) {
    await interaction.reply(interaction.user.toString());
  }
}

export default UserSubGroup;
