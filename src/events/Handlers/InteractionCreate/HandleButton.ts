import { InteractionCreateEvent } from "@/lib/classes";
import { ComponentManager } from "@/lib/managers";
import { ButtonInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class HandleButton extends InteractionCreateEvent {
  constructor(private readonly componentManager: ComponentManager) {
    super();
  }

  async handler(interaction: ButtonInteraction) {
    if (!interaction.isButton()) return;

    this.componentManager.onButtonInteraction(interaction);
  }
}

export default HandleButton;
