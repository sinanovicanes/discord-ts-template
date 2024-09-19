import { MetricsService } from "@/services";
import { Injectable, Logger, Schedule } from "@app/common";

@Injectable()
export default class MetricsSchedule extends Schedule {
  private readonly logger = new Logger(MetricsSchedule.name);

  name = "metrics";

  constructor(private readonly metricsService: MetricsService) {
    super("0 * * * * *");
  }

  private async logMetrics() {
    const metrics = await this.metricsService.getUsageMetrics();

    this.logger.log(`CPU Usage: ${metrics.cpu}%`);
    this.logger.log(`Memory Usage: ${metrics.memory.toFixed(4)} MB`);
  }

  onSchedule() {
    this.logMetrics();
  }
}
