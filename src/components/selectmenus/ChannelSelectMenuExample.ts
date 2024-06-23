import { ChannelSelectMenuComponent } from "@/lib/classes/components";
import { ChannelSelectMenuInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class ChannelSelectMenu extends ChannelSelectMenuComponent {
  constructor() {
    super({
      customId: "channel_select_menu",
      placeholder: "Select a channel",
      maxValues: 1
    });
  }

  async handler(interaction: ChannelSelectMenuInteraction) {
    const selectedRole = interaction.values[0];

    interaction.reply({
      content: "Thanks for submitting!",
      ephemeral: true
    });
  }
}

export default ChannelSelectMenu;
