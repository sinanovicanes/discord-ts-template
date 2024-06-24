import fs from "fs";
import path from "path";
import { container } from "tsyringe";
import { Event } from "@/lib/classes";

const EVENTS_PATH = path.join(__dirname, "../../../events");

const readEventDirectory = async (_path: string): Promise<Event[]> => {
  return new Promise((resolve, reject) => {
    const events: Event[] = [];

    fs.readdir(_path, async (err, files) => {
      if (err) {
        console.error(`Failed to read event directory: ${_path}`);
        return reject();
      }

      for (const file of files) {
        const filePath = path.join(_path, file);

        if (file.endsWith(".ts") || file.endsWith(".js")) {
          try {
            const event = require(filePath);

            if (!!event.default && event.default.prototype instanceof Event) {
              events.push(container.resolve(event.default));
            }
          } catch (e) {
            console.error(`Failed to load event handler: ${file}`);
          }
          continue;
        }

        if (fs.statSync(filePath).isDirectory()) {
          events.push(...(await readEventDirectory(filePath)));
        }
      }

      resolve(events);
    });
  });
};

export async function loadEvents(): Promise<Event[]> {
  const events: Event[] = await readEventDirectory(EVENTS_PATH);

  return events;
}
