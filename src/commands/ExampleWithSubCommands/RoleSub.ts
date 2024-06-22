import { SubCommand } from "@/lib/classes";
import { ChatInputCommandInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class RoleSubCommand extends SubCommand {
  name = "role";
  description = "Get user role";

  async handler(interaction: ChatInputCommandInteraction) {
    await interaction.reply(interaction.member?.roles.toString() ?? "No role");
  }
}

export default RoleSubCommand;
