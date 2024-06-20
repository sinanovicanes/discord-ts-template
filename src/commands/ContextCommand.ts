import { ContextMenuCommand } from "@/lib/classes";
import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction
} from "discord.js";

const COMMAND_NAME = "user-info";
const COMMAND_TYPE = ApplicationCommandType.User;

const builder = new ContextMenuCommandBuilder()
  .setName(COMMAND_NAME)
  .setType(COMMAND_TYPE);

const execute = async (interaction: ContextMenuCommandInteraction) => {
  const targetUserId = interaction.targetId;

  await interaction.reply({
    content: `Okay, here's the user info: ${targetUserId}`,
    ephemeral: true
  });
};

export default new ContextMenuCommand({
  name: COMMAND_NAME,
  builder,
  handler: execute,
  type: COMMAND_TYPE
});
