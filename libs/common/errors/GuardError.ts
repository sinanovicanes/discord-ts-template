export class GuardError extends Error {
  constructor() {
    super("Failed to pass guards");
  }
}
