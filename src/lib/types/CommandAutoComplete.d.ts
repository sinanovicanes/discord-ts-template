export type CommandAutoComplete =
  | ApplicationCommandOptionChoiceData<string>[]
  | Record<string, ApplicationCommandOptionChoiceData<string>[]>
  | ((
      focusedValue: AutocompleteFocusedOption
    ) => Promise<ApplicationCommandOptionChoiceData<string>[]>);
