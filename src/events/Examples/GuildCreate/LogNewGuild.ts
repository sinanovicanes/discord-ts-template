import { Client, GuildCreateEvent, Injectable, Logger } from "@app/common";
import { Guild } from "discord.js";

@Injectable()
export default class LogNewGuild extends GuildCreateEvent {
  private readonly logger = new Logger(LogNewGuild.name);

  constructor(private readonly client: Client) {
    super();
  }

  handler(guild: Guild) {
    this.logger.log(
      `${this.client.user?.username} joined guild: ${guild.name} with ${guild.memberCount} members.`
    );
  }
}
