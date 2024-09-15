import { CronJob } from "cron";

export abstract class Schedule extends CronJob {
  abstract name: string;
  abstract onSchedule(): void | Promise<void>;

  constructor(
    cronTime: string,
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  ) {
    super(cronTime, () => this.onTick(), null, false, timeZone);
  }

  private async onTick() {
    try {
      await this.onSchedule();
    } catch (e) {
      console.error(`Error in schedule ${this.name}: ${e}`);
    }
  }
}
