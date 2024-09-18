import { Middleware } from "../classes";
import { MIDDLEWARE_METADATA_KEY } from "../constants";
import { MiddlewareError } from "../errors";

export class MiddlewareExecutor {
  constructor(private readonly defaultMiddlewares: Middleware[] = []) {}

  private async useMiddleware(
    middleware: Middleware,
    interaction: MiddlewareInteraction
  ) {
    try {
      await middleware.use(interaction);
    } catch (e: any) {
      throw new MiddlewareError(
        middleware.getErrorMessage ? middleware.getErrorMessage() : e,
        interaction
      );
    }
  }

  private async useMiddlewares(
    middlewares: Middleware[],
    interaction: MiddlewareInteraction
  ) {
    for (const middleware of middlewares) {
      await this.useMiddleware(middleware, interaction);
    }
  }

  add(...middlewares: Middleware[]) {
    this.defaultMiddlewares.push(...middlewares);
  }

  async execute(targetClass: Object, interaction: MiddlewareInteraction) {
    // Apply default middlewares
    await this.useMiddlewares(this.defaultMiddlewares, interaction);

    const appliedMiddlewares = Reflect.getMetadata(
      MIDDLEWARE_METADATA_KEY,
      targetClass.constructor
    );

    if (!appliedMiddlewares) return;

    // Apply class middlewares
    this.useMiddlewares(appliedMiddlewares, interaction);
  }
}
