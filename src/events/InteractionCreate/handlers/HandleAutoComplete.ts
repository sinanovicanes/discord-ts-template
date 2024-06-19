import {
  ApplicationCommandOptionChoiceData,
  AutocompleteInteraction,
  Events
} from "discord.js";
import { CommandManager } from "../../../managers/CommandManager";
import { InteractionCreateEvent } from "../InteractionCreateEvent";

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

    console.log(JSON.stringify(focusedValue));

    switch (typeof command.autoComplete) {
      case "function": {
        const options = await command.autoComplete(focusedValue);
        const filteredOptions = this.filterOptions(focusedValue.value, options);

        interaction.respond(filteredOptions);
        break;
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

        interaction.respond(filteredChoices);

        break;
      }
      default: {
        interaction.respond([]);
        break;
      }
    }
  }
}

export default new HandleAutoComplete();
