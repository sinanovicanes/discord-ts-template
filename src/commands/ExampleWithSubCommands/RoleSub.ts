import { SubCommand } from "@/lib/classes";
import { CommandInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class RoleSubCommand extends SubCommand {
  name = "role";
  description = "Get user role";

  async handler(interaction: CommandInteraction) {
    await interaction.reply(interaction.member?.roles.toString() ?? "No role");
  }
}

export default RoleSubCommand;
