import { ContextMenuCommandInteraction, Interaction } from "discord.js";
import { InteractionError } from "./InteractionError";

export class FailedToHandleContextMenuCommand extends InteractionError {
  constructor(interaction: ContextMenuCommandInteraction) {
    super(
      interaction as Interaction,
      `Failed to handle context menu command: ${interaction.commandName}`
    );
  }
}
