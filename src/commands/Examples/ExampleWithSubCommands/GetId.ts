import { SubCommand } from "@/lib/classes";
import { ChatInputCommandInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class GetIdSubCommand extends SubCommand {
  name = "id";
  description = "Get user id";

  constructor() {
    super();
    this.addUserOption(option =>
      option
        .setName("user")
        .setDescription("The user to get the id of")
        .setRequired(false)
    );
  }

  async handler(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("user") ?? interaction.user;

    await interaction.reply({
      content: `The id of ${user} is ${user.id}`,
      ephemeral: true
    });
  }
}

export default GetIdSubCommand;
