import { UserSelectMenuComponent } from "@/lib/classes/components";
import { UserSelectMenuInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class UserSelectMenu extends UserSelectMenuComponent {
  constructor() {
    super({
      customId: "user_select_example_menu",
      placeholder: "Select a user",
      maxValues: 5
    });
  }

  async handler(interaction: UserSelectMenuInteraction) {
    const selectedUsers = interaction.values
      .map(userId => interaction.users.get(userId))
      .filter(user => !!user);

    await interaction.reply({
      content: `Selected users: ${selectedUsers.join(", ")}`,
      ephemeral: true
    });
  }
}

export default UserSelectMenu;
