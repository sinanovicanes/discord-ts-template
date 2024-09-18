import { CommandManager, GuildCreateEvent } from "@app/common";
import { Guild } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
export default class HandleGuildCommands extends GuildCreateEvent {
  constructor(private readonly commandManager: CommandManager) {
    super();
  }

  handler(guild: Guild) {
    this.commandManager.deployCommandsOnGuild(guild.id);
  }
}
