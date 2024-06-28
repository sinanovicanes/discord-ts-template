import { loadSchedules } from "@/lib/utils/loaders";
import { Collection } from "discord.js";
import { singleton } from "tsyringe";
import { Schedule } from "../classes/schedule";

@singleton()
export class ScheduleManager {
  private readonly jobs = new Collection<Schedule["name"], Schedule>([]);

  async initialize() {
    const schedules = await loadSchedules();

    schedules.forEach(schedule => {
      console.log(`Loaded schedule: ${schedule.name}`);
      this.jobs.set(schedule.name, schedule);
    });
  }
}
