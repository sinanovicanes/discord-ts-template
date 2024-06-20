import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "@/lib/classes";

const COMMAND_NAME = "ping";
const builder = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Replies with Pong!")
  .addStringOption(option =>
    option
      .setName("input")
      .setDescription("The input to echo back")
      .setRequired(true)
      .setAutocomplete(true)
  );

const execute = async (interaction: CommandInteraction) => {
  await interaction.reply({
    content: `Pong!`,
    ephemeral: true
  });
};

export default new Command({
  name: COMMAND_NAME,
  builder: builder as SlashCommandBuilder,
  autoComplete: [
    { name: "Hello", value: "Hi" },
    { name: "Goodbye", value: "Bye" },
    { name: "Goodbye 2", value: "Bye 2" }
  ],
  execute
});
