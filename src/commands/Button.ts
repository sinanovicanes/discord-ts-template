import {
  ActionRowBuilder,
  ButtonBuilder,
  CommandInteraction,
  SlashCommandBuilder
} from "discord.js";
import { Command } from "@lib/classes";
import { ButtonManager } from "@lib/managers/ButtonManager";

const COMMAND_NAME = "button";
const builder = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Shows example button");

const execute = async (interaction: CommandInteraction) => {
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    ButtonManager.getButtonBuilders(["confirmation"])
  );

  await interaction.reply({
    content: `Example buttons:`,
    components: [row]
  });
};

export default new Command({
  name: COMMAND_NAME,
  builder,
  execute
});
