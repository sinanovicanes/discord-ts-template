import { CommandInteraction, Interaction } from "discord.js";
import { InteractionError } from "./InteractionError";

export class FailedToHandleCommand extends InteractionError {
  constructor(interaction: CommandInteraction) {
    super(
      interaction as Interaction,
      `Failed to handle command: ${interaction.commandName}`
    );
  }
}
