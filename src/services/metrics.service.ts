import { Injectable } from "@app/common";
import pidusage from "pidusage";

interface UsageMetrics {
  cpu: number;
  memory: number;
}

@Injectable()
export class MetricsService {
  async getUsageMetrics(): Promise<UsageMetrics> {
    const metrics = await pidusage(process.pid);

    return {
      cpu: metrics.cpu,
      memory: metrics.memory / 1024 / 1024
    };
  }
}
