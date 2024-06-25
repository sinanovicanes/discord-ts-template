import { GuildCreateEvent } from "@/lib/classes";
import { Client } from "@/lib/client";
import { Guild } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
export default class LogNewGuild extends GuildCreateEvent {
  constructor(private readonly client: Client) {
    super();
  }

  async handler(guild: Guild) {
    console.log(
      `${this.client.user?.username} joined guild: ${guild.name} with ${guild.memberCount} members.`
    );
  }
}
