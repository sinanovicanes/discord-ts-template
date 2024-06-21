import * as fs from "fs";
import path from "path";
import { CommandBase, ContextMenuCommand, SlashCommand } from "../../classes";

const COMMANDS_PATH = path.join(__dirname, "../../../commands");

const readCommandsDirectory = (_path: string): CommandBase[] => {
  const commands: CommandBase[] = [];
  const commandFiles = fs.readdirSync(_path);

  for (const file of commandFiles) {
    if (file.endsWith(".ts") || file.endsWith(".js")) {
      try {
        const command = require(path.join(_path, file));

        if (
          command.default.prototype instanceof SlashCommand ||
          command.default.prototype instanceof ContextMenuCommand
        ) {
          commands.push(new command.default());
        }
      } catch {
        console.error(`Failed to load command: ${file}`);
      }
      continue;
    }

    if (fs.lstatSync(_path).isDirectory()) {
      commands.push(...readCommandsDirectory(path.join(_path, file)));
    }
  }

  return commands;
};

export function loadCommands(): CommandBase[] {
  const commands: CommandBase[] = readCommandsDirectory(COMMANDS_PATH);

  return commands;
}
