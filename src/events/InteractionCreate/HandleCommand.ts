import { CommandInteraction } from "discord.js";
import { InteractionCreateEvent } from "../../classes/event";
import { CommandManager } from "../../managers/CommandManager";

class HandleCommand extends InteractionCreateEvent {
  async execute(interaction: CommandInteraction) {
    if (!interaction.isCommand()) return;

    CommandManager.onCommandInteraction(interaction);
  }
}

export default new HandleCommand();
