import { UserSelectMenuComponent } from "@/lib/classes/components";
import { UserSelectMenuInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class UserSelectMenu extends UserSelectMenuComponent {
  constructor() {
    super({
      customId: "user_select_menu",
      placeholder: "Select a user",
      maxValues: 1
    });
  }

  async handler(interaction: UserSelectMenuInteraction) {
    const selectedUser = interaction.values[0];

    interaction.reply({
      content: "Thanks for submitting!",
      ephemeral: true
    });
  }
}

export default UserSelectMenu;
