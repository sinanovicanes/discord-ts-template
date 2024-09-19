import { CancelButton, ConfirmationButton } from "@/components";
import { DeferReplyMiddleware } from "@/middlewares";
import { Cooldown, Injectable, SlashCommand, UseMiddlewares } from "@app/common";
import { ChatInputCommandInteraction } from "discord.js";

@Injectable()
@Cooldown()
@UseMiddlewares(DeferReplyMiddleware)
class ButtonCommand extends SlashCommand {
  name = "button";
  description = "Shows example button";

  constructor(
    private readonly cancelButton: CancelButton,
    private readonly confirmationButton: ConfirmationButton
  ) {
    super();
  }

  handler(interaction: ChatInputCommandInteraction) {
    const row = this.cancelButton.toRow(this.confirmationButton);

    // Simulate a long process

    setTimeout(() => {
      interaction
        .editReply({
          content: `Example buttons:`,
          components: [row]
        })
        .catch();
    }, 5000);
  }
}

export default ButtonCommand;
