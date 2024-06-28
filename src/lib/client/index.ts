import { CLIENT_OPTIONS_KEY } from "@/lib/constants";
import { CommandManager } from "@/lib/managers/CommandManager";
import { EventManager } from "@/lib/managers/EventManager";
import { ClientOptions, Collection, Client as DiscordClient } from "discord.js";
import { inject, singleton } from "tsyringe";
import { ScheduleManager } from "../managers";

@singleton()
export class Client extends DiscordClient {
  readonly cooldowns = new Collection<string, number>();

  constructor(
    private readonly commandManager: CommandManager,
    private readonly eventManager: EventManager,
    private readonly scheduleManager: ScheduleManager,
    @inject(CLIENT_OPTIONS_KEY) public clientOptions: ClientOptions
  ) {
    super(clientOptions);
  }

  async connect(token: string) {
    await this.eventManager.initialize();
    await this.commandManager.initialize();
    await this.scheduleManager.initialize();
    this.login(token);
  }

  disconnect() {
    this.commandManager.clearCommands();
    this.destroy();
  }
}
