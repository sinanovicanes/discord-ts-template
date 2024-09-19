import { ExecutionContext, Middleware } from "../classes";
import { MIDDLEWARE_METADATA_KEY } from "../constants";
import { MiddlewareError } from "../errors";

export class MiddlewareExecutor {
  constructor(private readonly defaultMiddlewares: Middleware[] = []) {}

  private async useMiddlewares(middlewares: Middleware[], ctx: ExecutionContext) {
    for (const middleware of middlewares) {
      try {
        await middleware.use(ctx);
      } catch (e: any) {
        throw new MiddlewareError(
          !!middleware.getErrorMessage ? middleware.getErrorMessage() : e,
          ctx
        );
      }
    }
  }

  add(...middlewares: Middleware[]) {
    this.defaultMiddlewares.push(...middlewares);
  }

  async execute<T extends Function>(targetClass: T, ...args: any[]) {
    const ctx = new ExecutionContext(args, targetClass.constructor as Constructor<T>);

    // Apply default middlewares
    await this.useMiddlewares(this.defaultMiddlewares, ctx);

    const appliedMiddlewares = Reflect.getMetadata(
      MIDDLEWARE_METADATA_KEY,
      targetClass.constructor
    );

    if (!appliedMiddlewares) return;

    // Apply class middlewares
    await this.useMiddlewares(appliedMiddlewares, ctx);
  }
}
