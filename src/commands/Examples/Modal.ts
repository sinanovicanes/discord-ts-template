import { ExampleModal } from "@/components";
import { Injectable, SlashCommand } from "@app/common";
import { ChatInputCommandInteraction } from "discord.js";

@Injectable()
class ModalCommand extends SlashCommand {
  name = "modal";
  description = "Shows example modal";

  constructor(private readonly exampleModal: ExampleModal) {
    super();
  }

  async handler(interaction: ChatInputCommandInteraction) {
    await interaction.showModal(this.exampleModal);
  }
}

export default ModalCommand;
