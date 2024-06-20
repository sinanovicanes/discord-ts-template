import { CancelButton, ConfirmationButton } from "@/components";
import { ButtonActionRowBuilder } from "@/lib/builders";
import { Command } from "@lib/classes";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const COMMAND_NAME = "button";
const builder = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Shows example button");

const execute = async (interaction: CommandInteraction) => {
  const row = new ButtonActionRowBuilder(ConfirmationButton, CancelButton);

  await interaction.reply({
    content: `Example buttons:`,
    components: [row]
  });
};

export default new Command({
  name: COMMAND_NAME,
  builder,
  handler: execute
});
