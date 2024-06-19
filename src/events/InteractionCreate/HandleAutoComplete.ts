import { ApplicationCommandOptionChoiceData, AutocompleteInteraction } from "discord.js";
import { InteractionCreateEvent } from "../../classes/event";
import { CommandManager } from "../../managers/CommandManager";

class HandleAutoComplete extends InteractionCreateEvent {
  filterOptions(
    input: string,
    options: ApplicationCommandOptionChoiceData<string | number>[]
  ) {
    return options.filter(option =>
      option.name.toLowerCase().includes(input.toLowerCase())
    );
  }

  async execute(interaction: AutocompleteInteraction) {
    if (!interaction.isAutocomplete()) return;

    const command = CommandManager.getCommand(interaction.commandName);

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

export default new HandleAutoComplete();
