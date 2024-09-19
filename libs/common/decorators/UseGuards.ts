import { container } from "tsyringe";
import { Guard } from "../classes";
import { GuardError } from "../errors";

export function UseGuards(...guards: Constructor<Guard>[]): ClassDecorator {
  return (target: any) => {
    const handler = target.prototype.handler;

    if (!handler)
      throw new Error(`Unable to find handler in ${target.name} for UseGuards decorator`);

    target.prototype.handler = async function (...args: any[]) {
      const guardInstances = guards.map(guard => container.resolve(guard));

      for (const guard of guardInstances) {
        if (!(await guard.canActivate(...args))) {
          throw new GuardError();
        }
      }

      return handler.apply(this, args);
    };
  };
}
