import { ExampleModal } from "@/components";
import { SlashCommand } from "@/lib/classes";
import { CommandInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class ModalCommand extends SlashCommand {
  name = "modal";
  description = "Shows example modal";

  constructor(private readonly exampleModal: ExampleModal) {
    super();
  }

  async handler(interaction: CommandInteraction) {
    await interaction.showModal(this.exampleModal);
  }
}

export default ModalCommand;
