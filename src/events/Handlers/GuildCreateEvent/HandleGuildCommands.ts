import { GuildCreateEvent } from "@/lib/classes";
import { CommandManager } from "@/lib/managers";
import { Guild } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
export default class HandleGuildCommands extends GuildCreateEvent {
  constructor(private readonly commandManager: CommandManager) {
    super();
  }

  async handler(guild: Guild) {
    await this.commandManager.deployCommandsOnGuild(guild.id);
  }
}
