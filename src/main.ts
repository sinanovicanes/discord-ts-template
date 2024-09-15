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

  client.connect(env.BOT_TOKEN).catch(console.error);

  process.on("SIGINT", async () => {
    await client.disconnect();
    process.exit();
  });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
