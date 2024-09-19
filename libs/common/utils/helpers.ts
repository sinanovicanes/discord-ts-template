import { Interaction, InteractionReplyOptions } from "discord.js";
import { existsSync, mkdirSync } from "fs";

export function pluralify(singular: string, plural: string, count: number): string {
  return count === 1 ? singular : plural;
}

export function createDirectoryIfNotExists(path: string): void {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

export function tryToReplyInteraction(
  interaction: Interaction,
  options: string | InteractionReplyOptions
) {
  if (!interaction || !("isRepliable" in interaction) || !interaction.isRepliable())
    return;

  if (interaction.deferred) {
    interaction.editReply(options).catch(() => {});
    return;
  }

  interaction.reply(options).catch(() => {});
}
