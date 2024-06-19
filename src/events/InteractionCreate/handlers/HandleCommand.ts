import { CommandInteraction } from "discord.js";
import { CommandManager } from "../../../managers/CommandManager";
import { InteractionCreateEvent } from "../InteractionCreateEvent";

class HandleCommand extends InteractionCreateEvent {
  async execute(interaction: CommandInteraction) {
    if (!interaction.isCommand()) return;

    CommandManager.onCommandInteraction(interaction);
  }
}

export default new HandleCommand();
