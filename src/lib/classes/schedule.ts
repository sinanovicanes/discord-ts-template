import { CronJob } from "cron";

export abstract class Schedule extends CronJob {
  abstract name: string;
  abstract onSchedule(): void;

  constructor(
    cronTime: string,
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  ) {
    super(cronTime, () => this.onTick(), null, true, timeZone);
  }

  async onTick() {
    try {
      await this.onSchedule();
    } catch (e) {
      console.error(`Error in schedule ${this.name}: ${e}`);
    }
  }
}
