import { ExecutionContext } from "./execution-context";

export abstract class Middleware {
  abstract use(ctx: ExecutionContext): void | Promise<void>;
  getErrorMessage?(): string;
}
