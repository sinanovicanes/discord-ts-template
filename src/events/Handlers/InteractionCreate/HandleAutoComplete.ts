import { InteractionCreateEvent, SlashCommand } from "@/lib/classes";
import { CommandManager } from "@/lib/managers";
import {
  ApplicationCommandOptionChoiceData,
  AutocompleteInteraction,
  ChatInputCommandInteraction
} from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class HandleAutoComplete extends InteractionCreateEvent {
  constructor(private readonly commandManager: CommandManager) {
    super();
  }

  filterOptions(
    input: string,
    options: ApplicationCommandOptionChoiceData<string | number>[]
  ) {
    return options.filter(option =>
      option.name.toLowerCase().includes(input.toLowerCase())
    );
  }

  async handler(interaction: AutocompleteInteraction) {
    if (!interaction.isAutocomplete()) return;

    const command = this.commandManager.getCommandByInteraction(
      interaction
    ) as SlashCommand;

    if (!command) return interaction.respond([]);

    const focusedValue = interaction.options.getFocused(true);

    switch (typeof command.autoComplete) {
      case "function": {
        const options = await command.autoComplete(focusedValue);
        const filteredOptions = this.filterOptions(focusedValue.value, options);

        return interaction.respond(filteredOptions);
      }
      case "object": {
        const isArray = Array.isArray(command.autoComplete);

        if (isArray) {
          const filteredOptions = this.filterOptions(
            focusedValue.value,
            command.autoComplete as ApplicationCommandOptionChoiceData<string | number>[]
          );

          return interaction.respond(filteredOptions);
        }

        const choices = (
          command.autoComplete as Record<
            string,
            ApplicationCommandOptionChoiceData<string | number>[]
          >
        )[focusedValue.name];

        if (!choices) return interaction.respond([]);

        const filteredChoices = this.filterOptions(focusedValue.value, choices);

        return interaction.respond(filteredChoices);
      }
      default: {
        return interaction.respond([]);
      }
    }
  }
}

export default HandleAutoComplete;
