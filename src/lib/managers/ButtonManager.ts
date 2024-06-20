import Buttons from "@/components/buttons";
import { ButtonBuilder, ButtonInteraction } from "discord.js";
import { Button } from "../classes";
import { ButtonNotFound, FailedToHandleButton } from "../errors";

export class ButtonManager {
  static buttons: Map<Button["id"], Button> = new Map(
    Buttons.map(button => [button.id, button])
  );

  static getButton(name: Button["id"]) {
    return this.buttons.get(name);
  }

  static getButtonBuilder(name: Button["id"]) {
    return this.buttons.get(name)?.builder;
  }

  static getButtonBuilders(buttons: Button["id"][]): ButtonBuilder[] {
    return buttons
      .map(buttonId => this.getButtonBuilder(buttonId))
      .filter(builder => !!builder) as ButtonBuilder[];
  }

  static hasButton(name: Button["id"]) {
    return this.buttons.has(name);
  }

  static async onButtonInteraction(interaction: ButtonInteraction) {
    const button = this.getButton(interaction.customId as Button["id"]);
    if (!button) throw new ButtonNotFound(interaction);

    try {
      await button.execute(interaction);
    } catch (error) {
      throw new FailedToHandleButton(interaction);
    }
  }
}
