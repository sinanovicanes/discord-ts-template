import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CommandInteraction,
  SlashCommandBuilder
} from "discord.js";
import { Command } from "../classes";
import { Button } from "../classes/button";
import { ButtonManager } from "../managers/ButtonManager";

const COMMAND_NAME = "start-boss-timer";
const builder = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Starts a boss timer")
  .addStringOption(option =>
    option
      .setName("guild-name")
      .setDescription("The name of your Guild")
      .setRequired(true)
      .setMinLength(4)
      .setMaxLength(32)
  ) as SlashCommandBuilder;

const execute = async (interaction: CommandInteraction) => {
  const guildName = interaction.options.get("guildName");
  const server = interaction.options.get("server");
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    ButtonManager.getButtonBuilders(["confirmation"])
  );

  await interaction.reply({
    content: `Starting boss timer for ${guildName} on ${server}`,
    components: [row]
  });
};

export default new Command({
  name: COMMAND_NAME,
  builder,
  execute
});
