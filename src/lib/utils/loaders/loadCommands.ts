import * as fs from "fs";
import path from "path";
import { CommandBase, ContextMenuCommand, SlashCommand } from "../../classes";
import { Client } from "@/lib/client";

const COMMANDS_PATH = path.join(__dirname, "../../../commands");

const readCommandsDirectory = (_path: string, client: Client): CommandBase[] => {
  const commands: CommandBase[] = [];

  try {
    const commandFiles = fs.readdirSync(_path);

    for (const file of commandFiles) {
      const filePath = path.join(_path, file);

      if (file.endsWith(".ts") || file.endsWith(".js")) {
        try {
          const command = require(filePath);

          if (
            command.default.prototype instanceof SlashCommand ||
            command.default.prototype instanceof ContextMenuCommand
          ) {
            commands.push(new command.default(client));
          }
        } catch {
          console.error(`Failed to load command: ${file}`);
        }
        continue;
      }

      if (fs.lstatSync(filePath).isDirectory()) {
        commands.push(...readCommandsDirectory(filePath, client));
      }
    }
  } catch {
    console.error(`Failed to read commands directory: ${_path}`);
  }

  return commands;
};

export function loadCommands(client: Client): CommandBase[] {
  const commands: CommandBase[] = readCommandsDirectory(COMMANDS_PATH, client);

  return commands;
}
