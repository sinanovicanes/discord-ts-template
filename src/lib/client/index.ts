import { Client as DiscordClient, ClientOptions } from "discord.js";
import { CommandManager } from "../managers/CommandManager";
import { EventManager } from "../managers/EventManager";

export class Client extends DiscordClient {
  private readonly commandManager: CommandManager;
  private readonly eventManager: EventManager;

  constructor(public clientOptions: ClientOptions) {
    super(clientOptions);
    this.commandManager = new CommandManager(this);
    this.eventManager = new EventManager(this);
    this.eventManager.initiliaze();
  }

  connect(token: string) {
    this.login(token).then(this.commandManager.initiliaze);
  }

  disconnect() {
    this.commandManager.clearCommands();
    this.destroy();
  }
}
