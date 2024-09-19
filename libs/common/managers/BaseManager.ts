import { container } from "tsyringe";
import { Guard, Logger, Middleware } from "../classes";
import { GuardExecutor, MiddlewareExecutor } from "../executors";

export class BaseManager {
  protected readonly logger = new Logger(this.constructor.name);
  protected readonly middlewareExecutor = new MiddlewareExecutor();
  protected readonly guardExecutor = new GuardExecutor();

  protected async runExecutors(targetClass: Function, ...args: any[]) {
    await this.middlewareExecutor.execute(targetClass, ...args);
    await this.guardExecutor.execute(targetClass, ...args);
  }

  addMiddlewares(...middlewares: Constructor<Middleware>[]) {
    this.middlewareExecutor.add(
      ...middlewares.map(middleware => container.resolve(middleware))
    );
  }

  addGuards(...guards: Constructor<Guard>[]) {
    this.guardExecutor.add(...guards.map(guard => container.resolve(guard)));
  }
}
