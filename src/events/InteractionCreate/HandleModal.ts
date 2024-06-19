import { CommandInteraction, Events } from "discord.js";
import { Event } from "../../classes/event";
import { CommandManager } from "../../managers/CommandManager";

class HandleModal implements Event {
  event: Events = Events.InteractionCreate;
  once = false;

  async execute(interaction: CommandInteraction) {
    if (!interaction.isModalSubmit()) return;

    CommandManager.onCommandInteraction(interaction);
  }
}

export default new HandleModal();
