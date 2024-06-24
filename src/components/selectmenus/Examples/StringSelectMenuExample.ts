import { StringSelectMenuComponent } from "@/lib/classes/components";
import { StringSelectMenuInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class StringSelectMenu extends StringSelectMenuComponent {
  constructor() {
    super({
      customId: "string_select_example_menu",
      placeholder: "Select an option",
      options: [
        { label: "Option 1", value: "option_1" },
        { label: "Option 2", value: "option_2" },
        { label: "Option 3", value: "option_3" },
        { label: "Option 4", value: "option_4" }
      ]
    });
  }

  async handler(interaction: StringSelectMenuInteraction) {
    const selectedOption = interaction.values[0];

    interaction.reply({
      content: `You have selected: ${selectedOption}`,
      ephemeral: true
    });
  }
}

export default StringSelectMenu;
