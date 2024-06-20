import { InteractionCreateEvent } from "@/lib/classes";
import { CommandManager } from "@/lib/managers";
import { Interaction } from "discord.js";

class HandleContextMenu extends InteractionCreateEvent {
  async handler(interaction: Interaction) {
    if (!interaction.isContextMenuCommand()) return;

    CommandManager.onContextMenuCommandInteraction(interaction);
  }
}

export default new HandleContextMenu();
