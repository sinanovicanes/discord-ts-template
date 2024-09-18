import { ClientReadyEvent, Injectable, ScheduleManager } from "@app/common";

@Injectable()
export default class StartSchedules extends ClientReadyEvent {
  constructor(private readonly scheduleManager: ScheduleManager) {
    super();
  }

  handler() {
    this.scheduleManager.start();
  }
}
