import { COOLDOWN_METADATA_KEY, DEFAULT_COOLDOWN } from "../constants";

interface CooldownOptions {
  timeout?: number;
  global?: boolean;
}

export function Cooldown(
  options: CooldownOptions = { timeout: DEFAULT_COOLDOWN }
): ClassDecorator {
  return (target: Function) => {
    options.timeout = options.timeout || DEFAULT_COOLDOWN;
    Reflect.defineMetadata(COOLDOWN_METADATA_KEY, options, target);
  };
}
