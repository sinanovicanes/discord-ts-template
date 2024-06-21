import { SlashCommand } from "@/lib/classes";
import { Client } from "@/lib/client";
import { CommandInteraction } from "discord.js";

class AutoCompeleteCommand extends SlashCommand {
  name = "autocompelete";
  description = "Shows example auto complete";
  autoComplete = [
    { name: "Hello", value: "Hi" },
    { name: "Goodbye", value: "Bye" },
    { name: "Goodbye 2", value: "Bye 2" }
  ];

  constructor(private readonly client: Client) {
    super();
  }

  async handler(interaction: CommandInteraction) {
    await interaction.reply({
      content: `Pong!`,
      ephemeral: true
    });
  }
}

export default AutoCompeleteCommand;
