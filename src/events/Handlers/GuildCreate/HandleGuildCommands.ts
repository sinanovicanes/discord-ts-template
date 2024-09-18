import { CommandManager, GuildCreateEvent, Injectable } from "@app/common";
import { Guild } from "discord.js";

@Injectable()
export default class HandleGuildCommands extends GuildCreateEvent {
  constructor(private readonly commandManager: CommandManager) {
    super();
  }

  handler(guild: Guild) {
    this.commandManager.deployCommandsOnGuild(guild.id);
  }
}
