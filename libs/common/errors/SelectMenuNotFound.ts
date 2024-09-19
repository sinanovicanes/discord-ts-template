import { AnySelectMenuInteraction } from "discord.js";
import { InteractionError } from "./InteractionError";

export class SelectMenuNotFound extends InteractionError {
  constructor(interaction: AnySelectMenuInteraction) {
    super(interaction, `Select menu ${interaction.customId} not found`);
  }
}
