import { CancelButton, ConfirmationButton } from "@/components";
import { SlashCommand } from "@/lib/classes";
import { Client } from "@/lib/client";
import { ActionRowBuilder, ButtonBuilder, CommandInteraction } from "discord.js";

class ButtonCommand extends SlashCommand {
  name = "button";
  description = "Shows example button";

  constructor(private readonly client: Client) {
    super();
  }

  async handler(interaction: CommandInteraction) {
    const row = new ActionRowBuilder<ButtonBuilder>({
      components: [ConfirmationButton, CancelButton]
    });

    await interaction.reply({
      content: `Example buttons:`,
      components: [row]
    });
  }
}

export default ButtonCommand;
