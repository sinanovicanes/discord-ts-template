export abstract class Middleware<T = MiddlewareInteraction> {
  abstract use(interaction: T): void | Promise<void>;
  getErrorMessage?(): string;
}
