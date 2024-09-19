import { AnySelectMenuInteraction } from "discord.js";
import { InteractionError } from "./InteractionError";

export class FailedToHandleSelectMenu extends InteractionError {
  constructor(interaction: AnySelectMenuInteraction) {
    super(interaction, `Failed to handle select menu: ${interaction.customId}`);
  }
}
