import { CommandManager, Injectable, InteractionCreateEvent } from "@app/common";
import { Interaction } from "discord.js";

@Injectable()
export default class HandleContextMenu extends InteractionCreateEvent {
  constructor(private readonly commandManager: CommandManager) {
    super();
  }

  handler(interaction: Interaction) {
    if (!interaction.isContextMenuCommand()) return;

    this.commandManager.onContextMenuCommandInteraction(interaction);
  }
}
