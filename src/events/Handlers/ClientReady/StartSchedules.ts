import { ClientReadyEvent, ScheduleManager } from "@app/common";
import { singleton } from "tsyringe";

@singleton()
export default class StartSchedules extends ClientReadyEvent {
  constructor(private readonly scheduleManager: ScheduleManager) {
    super();
  }

  handler() {
    this.scheduleManager.start();
  }
}
