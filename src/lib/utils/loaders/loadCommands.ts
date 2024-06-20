import * as fs from "fs";
import path from "path";
import { Command, ContextMenuCommand } from "../../classes";

const COMMANDS_PATH = path.join(__dirname, "../../../commands");

const readCommandsDirectory = (_path: string): (Command & ContextMenuCommand)[] => {
  const commands: (Command & ContextMenuCommand)[] = [];
  const commandFiles = fs.readdirSync(_path);

  for (const file of commandFiles) {
    if (file.endsWith(".ts")) {
      try {
        const command = require(path.join(_path, file));

        if (
          command.default instanceof Command ||
          command.default instanceof ContextMenuCommand
        ) {
          commands.push(command.default);
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

export function loadCommands(): (Command & ContextMenuCommand)[] {
  const commands: (Command & ContextMenuCommand)[] = readCommandsDirectory(COMMANDS_PATH);

  return commands;
}
