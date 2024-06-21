import { CommandInteraction, Interaction } from "discord.js";
import { InteractionCreateEvent } from "@/lib/classes";
import { CommandManager } from "@/lib/managers";
import { Client } from "@/lib/client";

class HandleCommand extends InteractionCreateEvent {
  constructor(private readonly client: Client) {
    super();
  }

  async handler(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    CommandManager.onCommandInteraction(interaction as CommandInteraction);
  }
}

export default HandleCommand;
