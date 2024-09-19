import { ExecutionContext, Guard } from "../classes";
import { GUARD_METADATA_KEY } from "../constants";
import { GuardError } from "../errors";

export class GuardExecutor {
  constructor(private readonly defaultGuards: Guard[] = []) {}

  private async useGuards(guards: Guard[], ctx: ExecutionContext) {
    for (const guard of guards) {
      try {
        const canActivate = await guard.canActivate(ctx);

        if (!canActivate) {
          throw new Error("You shall not pass!");
        }
      } catch (e: any) {
        throw new GuardError(
          !!guard.getErrorMessage ? guard.getErrorMessage(ctx) : e,
          ctx
        );
      }
    }
  }

  add(...guards: Guard[]) {
    this.defaultGuards.push(...guards);
  }

  async execute<T extends Function>(targetClass: T, ...args: any[]) {
    const ctx = new ExecutionContext(args, targetClass.constructor as Constructor<T>);

    // Apply default guards
    await this.useGuards(this.defaultGuards, ctx);

    const appliedGuards = Reflect.getMetadata(
      GUARD_METADATA_KEY,
      targetClass.constructor
    );

    if (!appliedGuards) return;

    // Apply class guards
    await this.useGuards(appliedGuards, ctx);
  }
}
