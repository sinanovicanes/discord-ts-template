import { SlashCommand } from "@/lib/classes";
import { ChatInputCommandInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class AutoCompeleteCommand extends SlashCommand {
  name = "autocompelete";
  description = "Shows example auto complete";
  autoComplete = [
    { name: "Hello", value: "Hi" },
    { name: "Goodbye", value: "Bye" },
    { name: "Goodbye 2", value: "Bye 2" }
  ];

  constructor() {
    super();
  }

  async handler(interaction: ChatInputCommandInteraction) {
    await interaction.reply({
      content: `Pong!`,
      ephemeral: true
    });
  }
}

export default AutoCompeleteCommand;
