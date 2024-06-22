import * as fs from "fs";
import path from "path";
import { container } from "tsyringe";
import {
  CommandBase,
  ContextMenuCommand,
  SlashCommand,
  SubCommand,
  SubCommandGroup
} from "@/lib/classes";

const COMMANDS_PATH = path.join(__dirname, "../../../commands");

const readCommandsDirectory = async (_path: string): Promise<CommandBase[]> => {
  return new Promise((resolve, reject) => {
    const commands: CommandBase[] = [];

    fs.readdir(_path, async (err, files) => {
      if (err) {
        console.error(`Failed to read command directory: ${_path}`);
        return reject();
      }

      for (const file of files) {
        const filePath = path.join(_path, file);

        if (file.endsWith(".ts") || file.endsWith(".js")) {
          try {
            const command = require(filePath);

            if (!command.default) continue;

            if (
              command.default.prototype instanceof SlashCommand ||
              command.default.prototype instanceof ContextMenuCommand ||
              command.default.prototype instanceof SubCommand ||
              command.default.prototype instanceof SubCommandGroup
            ) {
              commands.push(container.resolve(command.default));
            }
          } catch {
            console.error(`Failed to load command: ${file}`);
          }
          continue;
        }

        if (fs.lstatSync(filePath).isDirectory()) {
          commands.push(...(await readCommandsDirectory(filePath)));
        }
      }

      resolve(commands);
    });
  });
};

export async function loadCommands(): Promise<CommandBase[]> {
  const commands: CommandBase[] = await readCommandsDirectory(COMMANDS_PATH);

  return commands;
}
