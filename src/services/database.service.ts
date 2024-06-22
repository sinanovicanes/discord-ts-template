import { singleton } from "tsyringe";

@singleton()
export class DatabaseService {
  private records: Record<string, string> = {};

  constructor() {}

  findRecord(key: string) {
    return this.records[key];
  }

  setRecord(key: string, value: string) {
    this.records[key] = value;
  }
}
