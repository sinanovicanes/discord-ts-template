import { constructor } from "tsyringe/dist/typings/types";
import { Middleware } from "../classes";
import { container } from "tsyringe";
import { MIDDLEWARE_METADATA_KEY } from "../constants";

export function UseMiddlewares(
  ...middlewares: constructor<Middleware>[]
): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(
      MIDDLEWARE_METADATA_KEY,
      middlewares.map(middleware => container.resolve(middleware)),
      target
    );
  };
}
