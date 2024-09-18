import { ComponentManager, Injectable, InteractionCreateEvent } from "@app/common";
import { ButtonInteraction } from "discord.js";

@Injectable()
export default class HandleButton extends InteractionCreateEvent {
  constructor(private readonly componentManager: ComponentManager) {
    super();
  }

  handler(interaction: ButtonInteraction) {
    if (!interaction.isButton()) return;

    this.componentManager.onButtonInteraction(interaction);
  }
}
