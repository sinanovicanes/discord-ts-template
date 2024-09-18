import { Injectable, RoleSelectMenuComponent } from "@app/common";
import { RoleSelectMenuInteraction } from "discord.js";

@Injectable()
export class RoleSelectMenu extends RoleSelectMenuComponent {
  constructor() {
    super({
      customId: "role_select_example_menu",
      placeholder: "Select a role",
      maxValues: 3
    });
  }

  async handler(interaction: RoleSelectMenuInteraction) {
    const selectedRoles = interaction.values
      .map(roleId => interaction.roles.get(roleId)?.name)
      .filter(role => !!role);

    await interaction.reply({
      content: `Selected roles: ${selectedRoles.join(", ")}`,
      ephemeral: true
    });
  }
}
