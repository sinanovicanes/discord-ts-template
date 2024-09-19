import {
  COOLDOWN_METADATA_KEY,
  ExecutionContext,
  Injectable,
  pluralify
} from "@app/common";
import { Interaction } from "discord.js";
import { CooldownService } from "../services";

@Injectable()
export class CooldownGuard {
  constructor(private readonly cooldownService: CooldownService) {}

  private getCooldownKey(ctx: ExecutionContext, global: boolean) {
    const [interaction] = ctx.getArgs<[Interaction]>();
    let commandKey = `${ctx.getClass().name}:${interaction.user.id}`;

    if (!global) {
      commandKey += `:${interaction.guildId}`;
    }

    return commandKey;
  }

  canActivate(ctx: ExecutionContext): boolean {
    const cooldownOptions = Reflect.getMetadata(COOLDOWN_METADATA_KEY, ctx.getClass());

    if (!cooldownOptions) {
      return true;
    }

    const { timeout, global } = cooldownOptions;
    const commandKey = this.getCooldownKey(ctx, global);
    const remainingSeconds = this.cooldownService.getRemainingTime(commandKey);

    if (remainingSeconds > 0) {
      throw new Error(
        `You are on cooldown. Please wait ${remainingSeconds} ${pluralify(
          "second",
          "seconds",
          remainingSeconds
        )}.`
      );
    }

    this.cooldownService.setCooldown(commandKey, timeout);

    return true;
  }
}
