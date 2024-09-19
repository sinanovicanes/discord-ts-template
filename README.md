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
@Injectable()
export default class LogNewGuild extends GuildCreateEvent {
  constructor(private readonly client: Client) {
    super();
  }

  handler(guild: Guild) {
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
@Injectable()
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
@Injectable()
export class ConfirmationButton extends ButtonComponent {
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

### UseMiddlewares

Custom middlewares can be created in the `/src/middlewares` directory by extending the `Middleware` class. These middlewares can be applied to command, component, and event handler classes using the `UseMiddlewares` decorator, enabling you to implement fine-grained access control for your application.

> [!TIP]
> Middlewares can be applied globally, or scoped specifically to commands, components, or event handlers using `client.useGlobalMiddlewares(...middlewares)`.

```ts
@Injectable()
export class DeferReplyMiddleware extends Middleware {
  private readonly logger = new Logger(DeferReplyMiddleware.name);

  async use(ctx: ExecutionContext) {
    const [interaction] = ctx.getArgs<[ChatInputCommandInteraction]>();

    if (interaction.deferred)
      return this.logger.warn(
        `Interaction is already deferred, Command: ${interaction.commandName}`
      );

    await interaction.deferReply({ ephemeral: true });
  }
}

@Injectable()
@UseMiddlewares(DeferReplyMiddleware)
export default class UploadImageCommand extends SlashCommand {
  name = "upload_image";
  description = "Uploads image";

  constructor(private readonly imageService: ImageService) {
    super();

    super.addAttachmentOption(option =>
      option.setName("image").setDescription("Image to upload").setRequired(true)
    );
  }

  async handler(interaction: ChatInputCommandInteraction) {
    const buffer = interaction.options.getAttachment("image").attachment;
    const imageURL = await this.imageService.upload(buffer);

    await interaction.editReply({
      content: imageURL
    });
  }
}
```

### UseGuards

Custom guards can be created in the `/src/guards` directory by extending the `Guard` class. These guards can be applied to command, component, and event handler classes using the `UseGuards` decorator, enabling you to implement fine-grained access control for your application.

> [!TIP]
> Guards can be applied globally, or scoped specifically to commands, components, or event handlers using `client.useGlobalGuards(...guards)`.

```ts
@Injectable()
export class NotBotGuard extends Guard {
  canActivate(message: Message) {
    return !message.author.bot;
  }
}

@UseGuards(NotBotGuard)
export default class LogMessageEvent extends MessageCreateEvent {
  handler(message: Message) {
    const guildName = message.guild?.name ?? "DM";
    const channel = message.guild?.channels.cache.get(message.channel.id);
    const channelName = channel?.name ?? message.channel.id;

    console.log(
      `[${guildName}/${channelName}] ${message.author.tag}: ${message.content}`
    );
  }
}
```

### Cooldown

The Cooldown decorator allows you to enforce cooldown periods for command or component handlers, limiting how frequently a user can execute a specific action. You can customize the cooldown duration in milliseconds and define whether the cooldown applies globally or is restricted to a specific guild.

> [!TIP]
> You can use CooldownService to set or remove cooldowns as needed.

```ts
@Injectable()
@Cooldown({ global: true, timeout: 30 * 1000 })
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
