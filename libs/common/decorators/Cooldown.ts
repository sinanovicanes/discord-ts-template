import { CommandInteraction } from "discord.js";
import { container } from "tsyringe";
import { Client } from "../client";
import { DEFAULT_COOLDOWN } from "../constants";

interface CooldownOptions {
  timeout?: number;
  global?: boolean;
}

export function Cooldown(cooldownOptions: CooldownOptions = {}): ClassDecorator {
  return (target: Function) => {
    const handler = target.prototype.handler;

    if (!handler)
      throw new Error(`Unable to find handler in ${target.name} for Cooldown decorator`);

    const isGlobal = cooldownOptions.global ?? false;
    const timeout = cooldownOptions.timeout ?? DEFAULT_COOLDOWN;

    target.prototype.handler = async function (interaction: CommandInteraction) {
      const client: Client = container.resolve(Client);
      let commandKey = `${target.name}:${interaction.user.id}`;

      if (!isGlobal) {
        commandKey += `:${interaction.guildId}`;
      }

      if (client.cooldowns.has(commandKey)) {
        const remainingSeconds = Math.ceil(
          (client.cooldowns.get(commandKey)! + timeout - Date.now()) / 1000
        );

        return interaction.reply({
          content: `You are on cooldown. Please wait ${remainingSeconds} seconds.`,
          ephemeral: true
        });
      }

      client.cooldowns.set(commandKey, Date.now());
      setTimeout(() => client.cooldowns.delete(commandKey), timeout);

      return handler.apply(this, interaction);
    };
  };
}
