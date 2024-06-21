import { InteractionCreateEvent } from "@/lib/classes";
import { Client } from "@/lib/client";
import { CommandManager } from "@/lib/managers";
import { Interaction } from "discord.js";

class HandleContextMenu extends InteractionCreateEvent {
  constructor(private readonly client: Client) {
    super();
  }

  async handler(interaction: Interaction) {
    if (!interaction.isContextMenuCommand()) return;

    CommandManager.onContextMenuCommandInteraction(interaction);
  }
}

export default HandleContextMenu;
