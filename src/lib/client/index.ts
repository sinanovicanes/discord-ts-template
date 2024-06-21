import { Client as DiscordClient, ClientOptions } from "discord.js";
import { CommandManager } from "../managers/CommandManager";
import { EventManager } from "../managers/EventManager";

export class Client extends DiscordClient {
  private readonly commandManager: CommandManager = new CommandManager(this);
  private readonly eventManager: EventManager = new EventManager(this);

  constructor(public clientOptions: ClientOptions) {
    super(clientOptions);
  }

  connect(token: string) {
    this.login(token);
  }

  disconnect() {
    this.commandManager.clearCommands();
    this.destroy();
  }
}
