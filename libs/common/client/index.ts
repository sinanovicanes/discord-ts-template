import { ClientOptions, Collection, Client as DiscordClient } from "discord.js";
import { Guard, Logger, Middleware } from "../classes";
import { CLIENT_OPTIONS_KEY } from "../constants";
import { Inject, Injectable } from "../decorators";
import {
  CommandManager,
  ComponentManager,
  EventManager,
  ScheduleManager
} from "../managers";

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

  useGlobalMiddlewares(...middlewares: Constructor<Middleware>[]) {
    this.useCommandMiddlewares(...middlewares);
    this.useEventMiddlewares(...middlewares);
    this.useComponentMiddlewares(...middlewares);
  }

  useGlobalGuards(...guards: Constructor<Guard>[]) {
    this.commandManager.useGuards(...guards);
    this.eventManager.useGuards(...guards);
    this.componentManager.useGuards(...guards);
  }

  useCommandMiddlewares(...middlewares: Constructor<Middleware>[]) {
    this.commandManager.useMiddlewares(...middlewares);
  }

  useEventMiddlewares(...middlewares: Constructor<Middleware>[]) {
    this.eventManager.useMiddlewares(...middlewares);
  }

  useComponentMiddlewares(...middlewares: Constructor<Middleware>[]) {
    this.componentManager.useMiddlewares(...middlewares);
  }

  useCommandGuards(...guards: Constructor<Guard>[]) {
    this.commandManager.useGuards(...guards);
  }

  useEventGuards(...guards: Constructor<Guard>[]) {
    this.eventManager.useGuards(...guards);
  }

  useComponentGuards(...guards: Constructor<Guard>[]) {
    this.componentManager.useGuards(...guards);
  }
}
