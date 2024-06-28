# Discord-ts-template

Lower your development time with organized codebase that includes examples and custom features for [discord.js](https://github.com/discordjs/discord.js). Written in TypeScript for type safety.

# Features

## Dependency Injection

[Tsyringe](https://github.com/microsoft/tsyringe) is used for dependency injection. You can create services, components, etc. to inject them wherever you need.

## Events

You can find the events in `/src/events`.
You can nest directories in events directory.

> Any file in the events directory with the default export will be registered as event if they're extended from one of the event classes.
> You can find the example event handlers in `/src/events/Examples`.

> [!CAUTION]
> `/src/events/handlers` is used for handling commands, components etc. If you're going to delete that you need to handle them by yourself.

```ts
@singleton()
export default class LogNewGuild extends GuildCreateEvent {
  constructor(private readonly client: Client) {
    super();
  }

  async handler(guild: Guild) {
    console.log(
      `${this.client.user?.username} joined guild: ${guild.name} with ${guild.memberCount} members.`
    );
  }
}
```

## Commands

You can find the commands in `/src/commands`.
You can nest directories in commands directory.

> Any file in the commands directory with the default export will be registered as command if they're extended from one of the command classes.
> You can find the example commands in `/src/commands/Examples`.

> [!TIP]
> You can make commands for specific guilds by passing guilds like `guilds: ["GUILD_ID_1", "GUILD_ID_2"]` in command class.

```ts
@singleton()
export default class ModalCommand extends SlashCommand {
  name = "modal";
  description = "Shows example modal";

  constructor(private readonly exampleModal: ExampleModal) {
    super();
  }

  async handler(interaction: ChatInputCommandInteraction) {
    await interaction.showModal(this.exampleModal);
  }
}
```

You can create:

- Slash Commands using `SlashCommand`
- Sub Commands using `SubCommand`
- Sub Command Groups using `SubCommandGroup`
- Context Menu Commands
  - User Context Menu Command using `UserContextMenuCommand`
  - Message Context Menu Command using `MessageContextMenuCommand`

## Components

You can find the components in `/src/components`.
You can nest directories in components directory.
Every component needs to be exported in `/src/components/index.ts` for them to get registered in ComponentManager.

```ts
@singleton()
export default class ConfirmationButton extends ButtonComponent {
  constructor() {
    super({
      customId: "confirm_button",
      label: "Confirm",
      style: ButtonStyle.Success
    });
  }

  async handler(interaction: ButtonInteraction) {
    await interaction.message.edit({
      content: "Confirmed!",
      components: []
    });
  }
}
```

You can create:

- Buttons using `ButtonComponent`
- Modals using `ModalComponent`
- Select Menus
  - String Select Menu using `StringSelectMenuComponent`
  - User Select Menu using `UserSelectMenuComponent`
  - Role Select Menu using `RoleSelectMenuComponent`
  - Channel Select Menu using `ChannelSelectMenuComponent`
  - Mentionable Select Menu using `MentionableSelectMenuComponent`

## Decorators

### UseGuards

You can create custom guards in `/src/guards` using `Guard` class. You can apply guards to classes using `UseGuards` decorator in any class with `handler` method in it.

```ts
@injectable()
export class NotBotGuard extends Guard {
  canActivate(message: Message) {
    return !message.author.bot;
  }
}

@UseGuards(NotBotGuard)
export default class LogMessageEvent extends MessageCreateEvent {
  async handler(message: Message) {
    const guildName = message.guild?.name ?? "DM";
    const channel = message.guild?.channels.cache.get(message.channel.id);
    const channelName = channel?.name ?? message.channel.id;

    console.log(
      `[${guildName}/${channelName}] ${message.author.tag}: ${message.content}`
    );
  }
}
```

### UseCooldown

You can use `UseCooldown` decorator to add cooldown to command or component handlers for user. You can specify the cooldown time in milliseconds and determine whether the is timeout by globally or only for this guild.

```ts
@singleton()
@UseCooldown({ global: true, timeout: 30 * 1000 })
export default class SayHiCommand extends SlashCommand {
  name = "say_hi";
  description = "Says hi";

  async handler(interaction: ChatInputCommandInteraction) {
    await interaction.reply({
      content: "Hi",
      ephemeral: true
    });
  }
}
```

## License

MIT License

Copyright (c) 2024 sinanovicanes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

