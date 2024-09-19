import { container } from "tsyringe";
import { Guard } from "../classes";
import { GUARD_METADATA_KEY } from "../constants";

export function UseGuards(...guards: Constructor<Guard>[]): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(
      GUARD_METADATA_KEY,
      guards.map(guard => container.resolve(guard)),
      target
    );
  };
}
