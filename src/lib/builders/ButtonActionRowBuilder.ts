import { Button } from "@/lib/classes";
import { ActionRowBuilder, ButtonBuilder } from "discord.js";

export class ButtonActionRowBuilder extends ActionRowBuilder<ButtonBuilder> {
  constructor(...buttons: Button[]) {
    super({ components: buttons.map(button => button.builder) });
  }

  //@ts-ignore
  override addComponents(...buttons: Button[]): this {
    return super.addComponents(buttons.map(button => button.builder));
  }
}
