import { MessageContextMenuCommand } from "@/lib/classes";
import { MessageContextMenuCommandInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class MessageContextCommand extends MessageContextMenuCommand {
  name = "message-react";
  guilds = ["1122510882711285790"];

  async handler(interaction: MessageContextMenuCommandInteraction) {
    const targetMessage = interaction.options.getMessage("message");

    if (!targetMessage) return await interaction.reply("Failed to get message");

    await targetMessage.react("👍");

    await interaction.reply({
      content: `Reacted to message: ${targetMessage}`,
      ephemeral: true
    });
  }
}

export default MessageContextCommand;
