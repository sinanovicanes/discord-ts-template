import { Logger, Schedule } from "@app/common";
import pidusage from "pidusage";

export default class MetricsSchedule extends Schedule {
  private readonly logger = new Logger(MetricsSchedule.name);

  name = "metrics";

  constructor() {
    super("0 */5 * * * *");
  }

  private async logMetrics() {
    const metrics = await pidusage(process.pid);

    this.logger.log(`CPU: ${metrics.cpu}%`);
    this.logger.log(`Memory: ${(metrics.memory / 1024 / 1024).toFixed(4)} MB`);
  }

  onSchedule() {
    this.logMetrics();
  }
}
