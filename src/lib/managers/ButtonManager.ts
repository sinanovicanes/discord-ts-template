import Buttons from "@/components/buttons";
import { ButtonInteraction } from "discord.js";
import { Button } from "../classes";
import { ButtonNotFound, FailedToHandleButton } from "../errors";

export class ButtonManager {
  static buttons: Map<Button["id"], Button> = new Map(
    Buttons.map(button => [button.id, button])
  );

  static getButton(name: Button["id"]) {
    return this.buttons.get(name);
  }

  static hasButton(name: Button["id"]) {
    return this.buttons.has(name);
  }

  static async onButtonInteraction(interaction: ButtonInteraction) {
    const button = this.getButton(interaction.customId as Button["id"]);
    if (!button) throw new ButtonNotFound(interaction);

    try {
      await button.handler(interaction);
    } catch (error) {
      throw new FailedToHandleButton(interaction);
    }
  }
}
