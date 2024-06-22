import { ClientOptions, Client as DiscordClient } from "discord.js";
import { inject, singleton } from "tsyringe";
import { CommandManager } from "../managers/CommandManager";
import { EventManager } from "../managers/EventManager";

@singleton()
export class Client extends DiscordClient {
  constructor(
    private readonly commandManager: CommandManager,
    private readonly eventManager: EventManager,
    @inject("ClientOptions") public clientOptions: ClientOptions
  ) {
    super(clientOptions);
  }

  async connect(token: string) {
    await this.eventManager.initialize();
    await this.commandManager.initialize();
    this.login(token);
  }

  disconnect() {
    this.commandManager.clearCommands();
    this.destroy();
  }
}
