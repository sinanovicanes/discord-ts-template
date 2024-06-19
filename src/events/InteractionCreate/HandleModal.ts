import { CommandInteraction } from "discord.js";
import { InteractionCreateEvent } from "../../classes/event";
import { CommandManager } from "../../managers/CommandManager";

class HandleModal extends InteractionCreateEvent {
  async execute(interaction: CommandInteraction) {
    if (!interaction.isModalSubmit()) return;

    CommandManager.onCommandInteraction(interaction);
  }
}

export default new HandleModal();
