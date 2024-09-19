import { CommandInteraction, Interaction } from "discord.js";
import { InteractionError } from "./InteractionError";

export class CommandNotFound extends InteractionError {
  constructor(interaction: CommandInteraction) {
    super(interaction as Interaction, `Command ${interaction.commandName} not found`);
  }
}
