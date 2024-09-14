import { SubCommand } from "@app/common";
import { ChatInputCommandInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class RoleSubCommand extends SubCommand {
  name = "role";
  description = "Get user role";

  constructor() {
    super();
    this.addUserOption(option =>
      option
        .setName("user")
        .setDescription("The user to get the role of")
        .setRequired(false)
    );
  }

  async handler(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("user") ?? interaction.user;
    const member = interaction.guild?.members.cache.get(user.id);

    if (!member) {
      await interaction.reply({
        content: "User not found",
        ephemeral: true
      });
      return;
    }

    await interaction.reply({
      content: `The role of ${user} is ${member.roles.highest}`,
      ephemeral: true
    });
  }
}

export default RoleSubCommand;
