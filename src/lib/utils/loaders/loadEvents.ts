import * as fs from "fs";
import path from "path";
import { Event } from "../../classes";
import { Client } from "@/lib/client";

const EVENTS_PATH = path.join(__dirname, "../../../events");

const readEventDirectory = (_path: string, client: Client): Event[] => {
  const events: Event[] = [];

  try {
    const eventFiles = fs.readdirSync(_path);

    for (const file of eventFiles) {
      const filePath = path.join(_path, file);

      if (file.endsWith(".ts") || file.endsWith(".js")) {
        try {
          const event = require(filePath);

          if (event.default && event.default.prototype instanceof Event) {
            events.push(new event.default(client));
          }
        } catch {
          console.error(`Failed to load event handler: ${file}`);
        }
        continue;
      }

      if (fs.lstatSync(filePath).isDirectory()) {
        events.push(...readEventDirectory(filePath, client));
      }
    }
  } catch {
    console.error(`Failed to read events directory: ${_path}`);
  }

  return events;
};

export function loadEvents(client: Client) {
  const events = readEventDirectory(EVENTS_PATH, client);

  return events;
}
