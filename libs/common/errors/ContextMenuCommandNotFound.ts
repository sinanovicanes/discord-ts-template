import { ContextMenuCommandInteraction, Interaction } from "discord.js";
import { InteractionError } from "./InteractionError";

export class ContextMenuCommandNotFound extends InteractionError {
  constructor(interaction: ContextMenuCommandInteraction) {
    super(
      interaction as Interaction,
      `Context menu command ${interaction.commandName} not found`
    );
  }
}
