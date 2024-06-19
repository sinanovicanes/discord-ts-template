import { CommandInteraction } from "discord.js";
import { CommandManager } from "../../../managers/CommandManager";
import { InteractionCreateEvent } from "../InteractionCreateEvent";

class HandleModal extends InteractionCreateEvent {
  async execute(interaction: CommandInteraction) {
    if (!interaction.isModalSubmit()) return;

    CommandManager.onCommandInteraction(interaction);
  }
}

export default new HandleModal();
