import { loadSchedules } from "../utils/loaders";
import { Collection } from "discord.js";
import { singleton } from "tsyringe";
import { Schedule } from "../classes/schedule";
import { Logger } from "../classes";

@singleton()
export class ScheduleManager {
  private readonly logger = new Logger(ScheduleManager.name);
  private readonly jobs = new Collection<Schedule["name"], Schedule>([]);

  async initialize() {
    const schedules = await loadSchedules();

    schedules.forEach(schedule => {
      this.logger.info(`Loaded schedule: ${schedule.name}`);
      this.jobs.set(schedule.name, schedule);
    });
  }
}
