import { ComponentManager, InteractionCreateEvent } from "@app/common";
import { ButtonInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
export default class HandleButton extends InteractionCreateEvent {
  constructor(private readonly componentManager: ComponentManager) {
    super();
  }

  handler(interaction: ButtonInteraction) {
    if (!interaction.isButton()) return;

    this.componentManager.onButtonInteraction(interaction);
  }
}
