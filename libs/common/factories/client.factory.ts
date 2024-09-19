import { ClientOptions } from "discord.js";
import { container } from "tsyringe";
import { Client } from "../client";
import { CLIENT_OPTIONS_KEY } from "../constants";
import { CooldownGuard } from "../guards";

export class ClientFactory {
  static create(options: ClientOptions): Client {
    container.register(CLIENT_OPTIONS_KEY, { useValue: options });

    const client = container.resolve(Client);

    client.useCommandGuards(CooldownGuard);
    client.useComponentGuards(CooldownGuard);

    return client;
  }
}
