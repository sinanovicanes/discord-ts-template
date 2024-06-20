import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../classes";
import { ExampleModal } from "../components";

const COMMAND_NAME = "modal";
const builder = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Shows example modal");

const execute = async (interaction: CommandInteraction) => {
  const modal = ExampleModal.builder;

  await interaction.showModal(modal);
};

export default new Command({
  name: COMMAND_NAME,
  builder,
  execute
});
