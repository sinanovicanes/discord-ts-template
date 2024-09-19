import { ExecutionContext } from "./execution-context";

export abstract class Guard {
  abstract canActivate(ctx: ExecutionContext): Promise<boolean> | boolean;
  getErrorMessage?(ctx: ExecutionContext): string;
}
