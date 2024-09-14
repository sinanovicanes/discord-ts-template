import { CancelButton, ConfirmationButton } from "@/components";
import { Cooldown, SlashCommand } from "@app/common";
import { ChatInputCommandInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
@Cooldown()
class ButtonCommand extends SlashCommand {
  name = "button";
  description = "Shows example button";

  constructor(
    private readonly cancelButton: CancelButton,
    private readonly confirmationButton: ConfirmationButton
  ) {
    super();
  }

  async handler(interaction: ChatInputCommandInteraction) {
    const row = this.cancelButton.toRow(this.confirmationButton);

    await interaction.reply({
      content: `Example buttons:`,
      components: [row]
    });
  }
}

export default ButtonCommand;
