import { InteractionCreateEvent } from "@/lib/classes";
import { ComponentManager } from "@/lib/managers";
import { AnySelectMenuInteraction, Interaction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class HandleSelectMenus extends InteractionCreateEvent {
  constructor(private readonly componentManager: ComponentManager) {
    super();
  }

  async handler(interaction: Interaction) {
    if (!interaction.isAnySelectMenu()) return;

    this.componentManager.onSelectMenuInteraction(
      interaction as AnySelectMenuInteraction
    );
  }
}

export default HandleSelectMenus;
