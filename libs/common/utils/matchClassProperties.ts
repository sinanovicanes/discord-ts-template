export function matchClassProperties<T>(ctor: new () => T, instance: T): T {
  const data: Record<string, any> = {};
  const rawInstance = new ctor();

  for (const key in rawInstance) {
    if (typeof instance[key as keyof T] === "function") continue;

    data[key] = instance[key as keyof T];
  }

  return data as T;
}
