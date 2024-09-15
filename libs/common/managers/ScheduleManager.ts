import { loadSchedules } from "../utils/loaders";
import { Collection } from "discord.js";
import { singleton } from "tsyringe";
import { Schedule } from "../classes/schedule";
import { Logger } from "../classes";

enum SchedulesStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING"
}

@singleton()
export class ScheduleManager {
  private readonly logger = new Logger(ScheduleManager.name);
  private readonly jobs = new Collection<Schedule["name"], Schedule>([]);
  private status = SchedulesStatus.PENDING;

  async initialize(start = false) {
    const schedules = await loadSchedules();

    schedules.forEach(schedule => {
      this.logger.info(`Loaded schedule: ${schedule.name}`);
      this.jobs.set(schedule.name, schedule);
    });

    if (start) {
      this.start();
    }
  }

  start() {
    if (this.status === SchedulesStatus.RUNNING) {
      return this.logger.warn("Schedules already running");
    }

    this.jobs.forEach(job => job.start());

    this.status = SchedulesStatus.RUNNING;
    this.logger.info(`${this.jobs.size} schedules started`);
  }

  stop() {
    if (this.status === SchedulesStatus.PENDING) {
      return this.logger.warn("Schedules already stopped");
    }

    this.jobs.forEach(job => job.stop());

    this.status = SchedulesStatus.PENDING;
    this.logger.info(`${this.jobs.size} schedules stopped`);
  }
}
