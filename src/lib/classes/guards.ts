export abstract class Guard {
  abstract canActivate(...args: any[]): Promise<boolean>;
}
