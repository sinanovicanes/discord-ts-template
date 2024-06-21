import { ExampleModal } from "@/components";
import { SlashCommand } from "@/lib/classes";
import { Client } from "@/lib/client";
import { CommandInteraction } from "discord.js";

class ModalCommand extends SlashCommand {
  name = "modal";
  description = "Shows example modal";

  constructor(private readonly client: Client) {
    super();
  }

  async handler(interaction: CommandInteraction) {
    await interaction.showModal(ExampleModal);
  }
}

export default ModalCommand;
