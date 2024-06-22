import { CancelButton, ConfirmationButton } from "@/components";
import { SlashCommand } from "@/lib/classes";
import { ActionRowBuilder, ButtonBuilder, CommandInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class ButtonCommand extends SlashCommand {
  name = "button";
  description = "Shows example button";

  constructor(
    private readonly cancelButton: CancelButton,
    private readonly confirmationButton: ConfirmationButton
  ) {
    super();
  }

  async handler(interaction: CommandInteraction) {
    const row = new ActionRowBuilder<ButtonBuilder>({
      components: [this.confirmationButton, this.cancelButton]
    });

    await interaction.reply({
      content: `Example buttons:`,
      components: [row]
    });
  }
}

export default ButtonCommand;
