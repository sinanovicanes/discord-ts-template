import { Guard } from "@/lib/classes";
import { container } from "tsyringe";
import { constructor } from "tsyringe/dist/typings/types";
import { GuardError } from "../errors";

export function UseGuards(...guards: constructor<Guard>[]): ClassDecorator {
  return (target: any) => {
    const handler = target.prototype.handler;

    if (!handler)
      throw new Error(`Unable to find handler in ${target.name} for UseGuards decorator`);

    target.prototype.handler = async function (...args: any[]) {
      const guardInstances = guards.map(guard => container.resolve(guard));
      const results = await Promise.all(
        guardInstances.map(guard => guard.canActivate(...args))
      );
      const shouldProceed = results.every(result => result === true);

      if (!shouldProceed) {
        throw new GuardError();
      }

      return handler.bind(this)(...args);
    };
  };
}
