import { SlashCommand } from "@/lib/classes";
import { ChatInputCommandInteraction, bold } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class AutoCompeleteCommand extends SlashCommand {
  name = "autocompelete";
  description = "Shows example auto complete";

  autoComplete = {
    book: [
      { name: "Harry Potter", value: "Harry Potter" },
      { name: "Lord of the Rings", value: "Lord of the Rings" }
    ],
    character: [
      { name: "Harry Potter", value: "Harry Potter" },
      { name: "Frodo Baggins", value: "Frodo Baggins" }
    ]
  };

  constructor() {
    super();

    this.addStringOption(input =>
      input
        .setName("book")
        .setDescription("Select your favorite book series")
        .setRequired(true)
        .setAutocomplete(true)
    );

    this.addStringOption(input =>
      input
        .setName("character")
        .setDescription("Select your favorite character from the book series")
        .setRequired(true)
        .setAutocomplete(true)
    );
  }

  async handler(interaction: ChatInputCommandInteraction) {
    const favoriteBook = interaction.options.getString("book")!;
    const favoriteCharacter = interaction.options.getString("character")!;

    await interaction.reply({
      content: `You have selected ${bold(favoriteBook)} as your favorite book and ${bold(
        favoriteCharacter
      )} as your favorite character`,
      ephemeral: true
    });
  }
}

export default AutoCompeleteCommand;
