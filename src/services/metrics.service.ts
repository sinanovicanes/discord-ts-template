import pidusage from "pidusage";
import { singleton } from "tsyringe";

interface UsageMetrics {
  cpu: number;
  memory: number;
}

@singleton()
export class MetricsService {
  async getUsageMetrics(): Promise<UsageMetrics> {
    const metrics = await pidusage(process.pid);

    return {
      cpu: metrics.cpu,
      memory: metrics.memory / 1024 / 1024
    };
  }
}
