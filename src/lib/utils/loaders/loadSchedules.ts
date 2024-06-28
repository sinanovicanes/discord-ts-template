import { Schedule } from "@/lib/classes/schedule";
import fs from "fs";
import path from "path";
import { container } from "tsyringe";

const SCHEDULES_PATH = path.join(__dirname, "../../../schedules");

const readScheduleDirectory = async (_path: string): Promise<Schedule[]> => {
  return new Promise((resolve, reject) => {
    const schedules: Schedule[] = [];

    fs.readdir(_path, async (err, files) => {
      if (err) {
        return reject(`Failed to read schedule directory: ${_path}`);
      }

      for (const file of files) {
        const filePath = path.join(_path, file);

        if (file.endsWith(".ts") || file.endsWith(".js")) {
          try {
            const schedule = require(filePath);

            if (!!schedule.default && schedule.default.prototype instanceof Schedule) {
              schedules.push(container.resolve(schedule.default));
            }
          } catch (e) {
            console.error(`Failed to load schedule: ${file}\n${e}`);
          }
          continue;
        }

        if (fs.statSync(filePath).isDirectory()) {
          schedules.push(...(await readScheduleDirectory(filePath)));
        }
      }

      resolve(schedules);
    });
  });
};

export async function loadSchedules(): Promise<Schedule[]> {
  const schedules: Schedule[] = await readScheduleDirectory(SCHEDULES_PATH);

  return schedules;
}
