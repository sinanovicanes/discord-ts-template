import { Interaction } from "discord.js";
import { tryToReplyInteraction } from "../utils";

export class InteractionError extends Error {
  constructor(interaction: Interaction, message?: string) {
    super(message ?? `Failed to handle interaction: ${interaction.id}`);

    tryToReplyInteraction(interaction, {
      content: this.message,
      ephemeral: true
    });
  }
}
