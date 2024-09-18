import { Injectable } from "@app/common";
import pidusage from "pidusage";

interface UsageMetrics {
  cpu: number;
  memory: number;
  ctime: number;
  elapsed: number;
  timestamp: number;
}

@Injectable()
export class MetricsService {
  async getUsageMetrics(): Promise<UsageMetrics> {
    const { ppid, pid, ...metrics } = await pidusage(process.pid);

    return {
      ...metrics,
      memory: metrics.memory / 1024 / 1024
    };
  }
}
