import { CommandManager, Injectable, InteractionCreateEvent } from "@app/common";
import { ChatInputCommandInteraction, Interaction } from "discord.js";

@Injectable()
export default class HandleCommand extends InteractionCreateEvent {
  constructor(private readonly commandManager: CommandManager) {
    super();
  }

  handler(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    this.commandManager.onCommandInteraction(interaction as ChatInputCommandInteraction);
  }
}
