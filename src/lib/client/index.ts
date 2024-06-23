import { CLIENT_OPTIONS_KEY } from "@/lib/constants";
import { CommandManager } from "@/lib/managers/CommandManager";
import { EventManager } from "@/lib/managers/EventManager";
import { ClientOptions, Client as DiscordClient } from "discord.js";
import { inject, singleton } from "tsyringe";

@singleton()
export class Client extends DiscordClient {
  constructor(
    private readonly commandManager: CommandManager,
    private readonly eventManager: EventManager,
    @inject(CLIENT_OPTIONS_KEY) public clientOptions: ClientOptions
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
