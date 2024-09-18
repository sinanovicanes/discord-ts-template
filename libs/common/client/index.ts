import { CLIENT_OPTIONS_KEY } from "../constants";
import { CommandManager } from "../managers/CommandManager";
import { EventManager } from "../managers/EventManager";
import { ClientOptions, Collection, Client as DiscordClient } from "discord.js";
import { ComponentManager, ScheduleManager } from "../managers";
import { Logger, Middleware } from "../classes";
import { Inject, Injectable } from "../decorators";
import { constructor } from "tsyringe/dist/typings/types";

@Injectable()
export class Client extends DiscordClient {
  readonly cooldowns = new Collection<string, number>();
  private readonly logger = new Logger(Client.name);

  constructor(
    private readonly commandManager: CommandManager,
    private readonly eventManager: EventManager,
    private readonly scheduleManager: ScheduleManager,
    private readonly componentManager: ComponentManager,
    @Inject(CLIENT_OPTIONS_KEY) public clientOptions: ClientOptions
  ) {
    super(clientOptions);
  }

  addCommandMiddlewares(...middlewares: constructor<Middleware>[]) {
    this.commandManager.addMiddlewares(...middlewares);
  }

  async connect(token: string) {
    this.logger.info("Connecting to Discord...");
    await this.eventManager.initialize();
    await this.commandManager.initialize();
    await this.scheduleManager.initialize();
    await this.componentManager.initialize();
    await this.login(token);
    this.logger.info("Connected to Discord!");
  }

  async disconnect() {
    this.logger.info("Disconnecting from Discord...");
    this.scheduleManager.stop();
    await this.commandManager.clearCommands();
    await this.destroy();
    this.logger.info("Disconnected from Discord!");
  }
}
