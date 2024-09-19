import { container } from "tsyringe";
import { Logger, Middleware } from "../classes";
import { MiddlewareExecutor } from "../executors";

export class BaseManager {
  protected readonly middlewareExecutor = new MiddlewareExecutor();
  protected readonly logger = new Logger(this.constructor.name);

  addMiddlewares(...middlewares: Constructor<Middleware>[]) {
    this.middlewareExecutor.add(
      ...middlewares.map(middleware => container.resolve(middleware))
    );
  }
}
