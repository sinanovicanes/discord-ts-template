import { CommandManager, InteractionCreateEvent } from "@app/common";
import { ChatInputCommandInteraction, Interaction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
export default class HandleCommand extends InteractionCreateEvent {
  constructor(private readonly commandManager: CommandManager) {
    super();
  }

  handler(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    this.commandManager.onCommandInteraction(interaction as ChatInputCommandInteraction);
  }
}
