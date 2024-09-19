import { ButtonInteraction, Interaction } from "discord.js";
import { InteractionError } from "./InteractionError";

export class FailedToHandleButton extends InteractionError {
  constructor(interaction: ButtonInteraction) {
    super(interaction as Interaction, `Failed to handle button: ${interaction.customId}`);
  }
}
