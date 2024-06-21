import { ButtonInteraction } from "discord.js";
import { InteractionCreateEvent } from "@/lib/classes";
import { ComponentManager } from "@/lib/managers";
import { Client } from "@/lib/client";

class HandleButton extends InteractionCreateEvent {
  constructor(private readonly client: Client) {
    super();
  }

  async handler(interaction: ButtonInteraction) {
    if (!interaction.isButton()) return;

    ComponentManager.onButtonInteraction(interaction);
  }
}

export default HandleButton;
