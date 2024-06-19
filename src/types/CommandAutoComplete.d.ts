export type CommandAutoComplete =
  | ApplicationCommandOptionChoiceData<string | number>[]
  | Record<string, ApplicationCommandOptionChoiceData<string | number>[]>
  | ((
      focusedValue: AutocompleteFocusedOption
    ) => Promise<ApplicationCommandOptionChoiceData<string | number>[]>);
