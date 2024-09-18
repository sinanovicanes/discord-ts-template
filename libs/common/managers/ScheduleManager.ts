import { Collection } from "discord.js";
import { Logger } from "../classes";
import { Schedule } from "../classes/schedule";
import { Injectable } from "../decorators";
import { pluralify } from "../utils";
import { loadSchedules } from "../utils/loaders";

enum SchedulesStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING"
}

@Injectable()
export class ScheduleManager {
  private readonly logger = new Logger(ScheduleManager.name);
  private readonly schedules = new Collection<Schedule["name"], Schedule>([]);
  private status = SchedulesStatus.PENDING;

  async initialize(start = false) {
    const schedules = await loadSchedules();

    schedules.forEach(schedule => {
      this.schedules.set(schedule.name, schedule);
    });

    this.logger.info(
      `${schedules.length} ${pluralify("schedule", "schedules", schedules.length)} loaded`
    );

    if (start) {
      this.start();
    }
  }

  start() {
    if (this.status === SchedulesStatus.RUNNING) {
      return this.logger.warn("Schedules already running");
    }

    this.schedules.forEach(job => job.start());

    this.status = SchedulesStatus.RUNNING;
    this.logger.info(
      `${this.schedules.size} ${pluralify(
        "schedule",
        "schedules",
        this.schedules.size
      )} started`
    );
  }

  stop() {
    if (this.status === SchedulesStatus.PENDING) {
      return this.logger.warn("Schedules already stopped");
    }

    this.schedules.forEach(job => job.stop());

    this.status = SchedulesStatus.PENDING;
    this.logger.info(
      `${this.schedules.size} ${pluralify(
        "schedule",
        "schedules",
        this.schedules.size
      )} stopped`
    );
  }
}
