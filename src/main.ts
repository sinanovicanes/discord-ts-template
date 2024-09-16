import "reflect-metadata";
import env from "@/env";
import { ClientFactory } from "@app/common";
import { GatewayIntentBits } from "discord.js";

async function main() {
  const client = ClientFactory.createClient({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers
    ]
  });

  await client.connect(env.BOT_TOKEN);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
