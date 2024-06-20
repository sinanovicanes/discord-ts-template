import { Client, ClientOptions } from "discord.js";
import { CommandManager } from "../managers/CommandManager";
import { EventManager } from "../managers/EventManager";

export class BotClient {
  readonly client: Client;
  private readonly commandManager: CommandManager;
  private readonly eventManager: EventManager;

  constructor(public clientOptions: ClientOptions) {
    this.client = new Client(clientOptions);
    this.commandManager = new CommandManager(this.client);
    this.eventManager = new EventManager(this.client);
    this.eventManager.initiliaze();
  }

  connect(token: string) {
    this.client.login(token).then(this.commandManager.initiliaze);
  }

  disconnect() {
    this.commandManager.clearCommands();
    this.client.destroy();
  }
}
