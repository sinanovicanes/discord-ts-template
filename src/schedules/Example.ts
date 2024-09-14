import { Logger, Schedule } from "@app/common";

export default class ExampleSchedule extends Schedule {
  private readonly logger = new Logger(ExampleSchedule.name);

  name = "example";

  constructor() {
    super("*/5 * * * * *");
  }

  onSchedule() {
    this.logger.log("Example schedule has been executed");
  }
}
