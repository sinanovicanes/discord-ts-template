import { InteractionCreateEvent } from "@/lib/classes";
import { CommandManager } from "@/lib/managers";
import { CommandInteraction, Interaction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class HandleCommand extends InteractionCreateEvent {
  constructor(private readonly commandManager: CommandManager) {
    super();
  }

  //TODO: HANDLE SUB COMMANDS
  async handler(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    this.commandManager.onCommandInteraction(interaction as CommandInteraction);
  }
}

export default HandleCommand;
