import * as fs from "fs";
import path from "path";
import { Event } from "../../classes";
import { Client } from "@/lib/client";

const EVENTS_PATH = path.join(__dirname, "../../../events");

const readEventDirectory = (_path: string, client: Client): Event[] => {
  const events: Event[] = [];
  const eventFiles = fs.readdirSync(_path);

  for (const file of eventFiles) {
    if (file.endsWith(".ts") || file.endsWith(".js")) {
      try {
        const event = require(path.join(_path, file));

        if (event.default && event.default.prototype instanceof Event) {
          events.push(new event.default(client));
        }
      } catch {
        console.error(`Failed to load event handler: ${file}`);
      }
      continue;
    }

    if (fs.lstatSync(_path).isDirectory()) {
      events.push(...readEventDirectory(path.join(_path, file), client));
    }
  }

  return events;
};

export function loadEvents(client: Client) {
  const events = readEventDirectory(EVENTS_PATH, client);

  return events;
}
