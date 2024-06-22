import { SlashCommand } from "@/lib/classes";
import { Client } from "@/lib/client";
import { CommandInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class TestCommand extends SlashCommand {
  name = "test";
  description = "Test";

  constructor(private readonly client: Client) {
    super();
  }

  async handler(interaction: CommandInteraction) {
    console.log("HI");
  }
}

export default TestCommand;
