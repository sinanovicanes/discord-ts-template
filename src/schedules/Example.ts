import { Schedule } from "@/lib/classes";

export default class ExampleSchedule extends Schedule {
  name = "example";

  constructor() {
    super("*/5 * * * * *");
  }

  onSchedule() {
    console.log("Example schedule has been executed");
  }
}
