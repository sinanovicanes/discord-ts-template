import { SubCommand } from "@/lib/classes";
import { CommandInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class InfoSubCommand extends SubCommand {
  name = "id";
  description = "Get user id";

  async handler(interaction: CommandInteraction) {
    await interaction.reply(interaction.user.id);
  }
}

export default InfoSubCommand;
