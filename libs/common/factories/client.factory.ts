import { ClientOptions } from "discord.js";
import { container } from "tsyringe";
import { Client } from "../client";
import { CLIENT_OPTIONS_KEY } from "../constants";

export class ClientFactory {
  static create(options: ClientOptions): Client {
    container.register(CLIENT_OPTIONS_KEY, { useValue: options });

    return container.resolve(Client);
  }
}
