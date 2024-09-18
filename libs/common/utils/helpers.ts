import { existsSync, mkdirSync } from "fs";

export function pluralify(singular: string, plural: string, count: number): string {
  return count === 1 ? singular : plural;
}

export function createDirectoryIfNotExists(path: string): void {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}
