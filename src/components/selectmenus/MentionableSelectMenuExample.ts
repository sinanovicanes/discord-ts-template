import { MentionableSelectMenuComponent } from "@/lib/classes/components";
import { MentionableSelectMenuInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class MentionableSelectMenu extends MentionableSelectMenuComponent {
  constructor() {
    super({
      customId: "mentionable_select_menu",
      placeholder: "Select a mentionable role or user",
      maxValues: 3
    });
  }

  async handler(interaction: MentionableSelectMenuInteraction) {
    const selectedRole = interaction.values[0];

    interaction.reply({
      content: "Thanks for submitting!",
      ephemeral: true
    });
  }
}

export default MentionableSelectMenu;
