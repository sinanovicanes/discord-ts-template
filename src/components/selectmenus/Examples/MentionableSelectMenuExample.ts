import { MentionableSelectMenuComponent } from "@/lib/classes/components";
import { MentionableSelectMenuInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class MentionableSelectMenu extends MentionableSelectMenuComponent {
  constructor() {
    super({
      customId: "mentionable_select_example_menu",
      placeholder: "Select a mentionable role or user",
      maxValues: 3
    });
  }

  async handler(interaction: MentionableSelectMenuInteraction) {
    const selectedMentionables = interaction.values
      .map(
        mentionableId =>
          interaction.roles.get(mentionableId) ?? interaction.members.get(mentionableId)
      )
      .filter(mentionable => !!mentionable);

    interaction.reply({
      content: `Selected mentionables: ${selectedMentionables.join(", ")}`,
      ephemeral: true
    });
  }
}

export default MentionableSelectMenu;
