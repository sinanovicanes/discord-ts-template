import { ModalSubmitInteraction } from "discord.js";
import { InteractionError } from "./InteractionError";

export class FailedToHandleModal extends InteractionError {
  constructor(interaction: ModalSubmitInteraction) {
    super(interaction, `Failed to handle modal: ${interaction.customId}`);
  }
}
