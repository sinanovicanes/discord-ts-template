import { CommandInteraction, Interaction } from "discord.js";
import { InteractionCreateEvent } from "../../classes/event";
import { CommandManager } from "../../managers/CommandManager";

class HandleCommand extends InteractionCreateEvent {
  async handler(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    CommandManager.onCommandInteraction(interaction as CommandInteraction);
  }
}

export default new HandleCommand();
