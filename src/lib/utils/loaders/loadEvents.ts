import * as fs from "fs";
import path from "path";
import { Event } from "../../classes";

const EVENTS_PATH = path.join(__dirname, "../../../events");

const readEventDirectory = (_path: string): Event[] => {
  const events: Event[] = [];
  const eventFiles = fs.readdirSync(_path);

  for (const file of eventFiles) {
    if (file.endsWith(".ts")) {
      try {
        const event = require(path.join(_path, file));

        if (event.default && event.default.prototype instanceof Event) {
          events.push(new event.default());
        }
      } catch {
        console.error(`Failed to load event handler: ${file}`);
      }
      continue;
    }

    if (fs.lstatSync(_path).isDirectory()) {
      events.push(...readEventDirectory(path.join(_path, file)));
    }
  }

  return events;
};

export function loadEvents() {
  const events = readEventDirectory(EVENTS_PATH);

  return events;
}
