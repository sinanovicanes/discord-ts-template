import { ChannelSelectMenuComponent } from "@/lib/classes/components";
import { UseCooldown } from "@/lib/decorators";
import { ChannelSelectMenuInteraction, ChannelType } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
@UseCooldown()
class ChannelSelectMenu extends ChannelSelectMenuComponent {
  constructor() {
    super({
      customId: "channel_select_example_menu",
      placeholder: "Select a channel",
      maxValues: 5,
      channelTypes: [ChannelType.GuildText]
    });
  }

  async handler(interaction: ChannelSelectMenuInteraction) {
    const selectedChannels = interaction.values
      .map(channelId => interaction.channels.get(channelId))
      .filter(channel => !!channel);

    interaction.reply({
      content: `Selected channels: ${selectedChannels.join(", ")}`,
      ephemeral: true
    });
  }
}

export default ChannelSelectMenu;
