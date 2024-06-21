import { ButtonInteraction } from "discord.js";
import { InteractionCreateEvent } from "@/lib/classes";
import { ButtonManager } from "@/lib/managers";
import { Client } from "@/lib/client";

class HandleButton extends InteractionCreateEvent {
  constructor(private readonly client: Client) {
    super();
  }

  async handler(interaction: ButtonInteraction) {
    if (!interaction.isButton()) return;

    ButtonManager.onButtonInteraction(interaction);
  }
}

export default HandleButton;
