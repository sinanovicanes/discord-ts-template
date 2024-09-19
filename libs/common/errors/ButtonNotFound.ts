import { ButtonInteraction } from "discord.js";
import { InteractionError } from "./InteractionError";

export class ButtonNotFound extends InteractionError {
  constructor(interaction: ButtonInteraction) {
    super(interaction, `Button ${interaction.customId} not found`);
  }
}
