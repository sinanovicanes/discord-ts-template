import { CommandInteraction, Events } from "discord.js";
import { Event } from "../../classes/event";
import { CommandManager } from "../../managers/CommandManager";

class HandleCommand implements Event {
  event: Events = Events.InteractionCreate;
  once = false;

  async execute(interaction: CommandInteraction) {
    if (!interaction.isCommand()) return;

    CommandManager.onCommandInteraction(interaction);
  }
}

export default new HandleCommand();
