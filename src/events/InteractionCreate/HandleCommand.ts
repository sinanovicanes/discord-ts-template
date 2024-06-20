import { CommandInteraction, Interaction } from "discord.js";
import { InteractionCreateEvent } from "@lib/classes";
import { CommandManager } from "@lib/managers";

class HandleCommand extends InteractionCreateEvent {
  async handler(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    CommandManager.onCommandInteraction(interaction as CommandInteraction);
  }
}

export default new HandleCommand();
