import { RoleSelectMenuComponent } from "@/lib/classes/components";
import { RoleSelectMenuInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class RoleSelectMenu extends RoleSelectMenuComponent {
  constructor() {
    super({
      customId: "role_select_menu",
      placeholder: "Select a role",
      maxValues: 1
    });
  }

  async handler(interaction: RoleSelectMenuInteraction) {
    const selectedRole = interaction.values[0];

    interaction.reply({
      content: "Thanks for submitting!",
      ephemeral: true
    });
  }
}

export default RoleSelectMenu;
