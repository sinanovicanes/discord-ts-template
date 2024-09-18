import { injectable, InjectionToken, Lifecycle, scoped, singleton } from "tsyringe";
import { InjectionScopes } from "../enums";

export const Injectable = (
  scope: InjectionScopes = InjectionScopes.SINGLETON,
  token?: InjectionToken
) => {
  switch (scope) {
    case InjectionScopes.SINGLETON:
      return singleton();
    case InjectionScopes.TRANSIENT:
      return injectable();
    case InjectionScopes.RESOLUTION:
      return scoped(Lifecycle.ResolutionScoped, token);
    case InjectionScopes.CONTAINER:
      return scoped(Lifecycle.ContainerScoped, token);
    default:
      throw new Error("Invalid scope");
  }
};
