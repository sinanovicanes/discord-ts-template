import { ComponentManager, Injectable, InteractionCreateEvent } from "@app/common";
import { AnySelectMenuInteraction, Interaction } from "discord.js";

@Injectable()
export default class HandleSelectMenus extends InteractionCreateEvent {
  constructor(private readonly componentManager: ComponentManager) {
    super();
  }

  handler(interaction: Interaction) {
    if (!interaction.isAnySelectMenu()) return;

    this.componentManager.onSelectMenuInteraction(
      interaction as AnySelectMenuInteraction
    );
  }
}
