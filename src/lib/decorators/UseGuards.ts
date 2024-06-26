import { Guard } from "@/lib/classes";
import { container } from "tsyringe";
import { constructor } from "tsyringe/dist/typings/types";

export function UseGuards(
  ...guards: constructor<Guard>[]
): MethodDecorator & ClassDecorator {
  return (target: any, key?: string | symbol, descriptor?: PropertyDescriptor) => {
    const handler = descriptor?.value ?? target.prototype.handler;

    if (!handler) return;

    const newHandler = async (...args: any[]) => {
      const guardInstances = guards.map(guard => container.resolve(guard));
      const results = await Promise.all(
        guardInstances.map(guard => guard.canActivate(...args))
      );
      const shouldProceed = results.every(result => result === true);

      if (!shouldProceed) {
        throw new Error("Failed to pass guard");
      }

      return handler(...args);
    };

    if (descriptor?.value) {
      descriptor.value = newHandler;
      return;
    }

    target.prototype.handler = newHandler;
  };
}
