import { CancelButton, ConfirmationButton } from "@/components";
import { ButtonActionRowBuilder } from "@/lib/builders";
import { SlashCommand } from "@/lib/classes";
import { Client } from "@/lib/client";
import { CommandInteraction } from "discord.js";

class ButtonCommand extends SlashCommand {
  name = "button";
  description = "Shows example button";

  constructor(private readonly client: Client) {
    super();
  }

  async handler(interaction: CommandInteraction) {
    const row = new ButtonActionRowBuilder(ConfirmationButton, CancelButton);

    await interaction.reply({
      content: `Example buttons:`,
      components: [row]
    });
  }
}

export default ButtonCommand;
