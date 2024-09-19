import { ModalSubmitInteraction } from "discord.js";
import { InteractionError } from "./InteractionError";

export class ModalNotFound extends InteractionError {
  constructor(interaction: ModalSubmitInteraction) {
    super(interaction, `Modal ${interaction.customId} not found`);
  }
}
