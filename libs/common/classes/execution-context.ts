export class ExecutionContext {
  constructor(
    private readonly args: any[],
    private readonly constructorRef: Constructor<any>
  ) {}

  getClass<T = any>(): Constructor<T> {
    return this.constructorRef;
  }

  getArgs<T extends Array<any> = any[]>(): T {
    return this.args as T;
  }

  getArgByIndex<T = any>(index: number): T {
    return this.args[index] as T;
  }
}
