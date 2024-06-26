import { InteractionCreateEvent } from "@/lib/classes";
import { CommandManager } from "@/lib/managers";
import { Interaction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class HandleContextMenu extends InteractionCreateEvent {
  constructor(private readonly commandManager: CommandManager) {
    super();
  }

  async handler(interaction: Interaction) {
    if (!interaction.isContextMenuCommand()) return;

    this.commandManager.onContextMenuCommandInteraction(interaction);
  }
}

export default HandleContextMenu;
