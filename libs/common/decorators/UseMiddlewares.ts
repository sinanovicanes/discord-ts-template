import { container } from "tsyringe";
import { Middleware } from "../classes";
import { MIDDLEWARE_METADATA_KEY } from "../constants";

export function UseMiddlewares(
  ...middlewares: Constructor<Middleware>[]
): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(
      MIDDLEWARE_METADATA_KEY,
      middlewares.map(middleware => container.resolve(middleware)),
      target
    );
  };
}
