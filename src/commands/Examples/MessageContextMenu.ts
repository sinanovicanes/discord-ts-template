import { Injectable, MessageContextMenuCommand } from "@app/common";
import { MessageContextMenuCommandInteraction } from "discord.js";

@Injectable()
class MessageContextCommand extends MessageContextMenuCommand {
  name = "message-react";

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
