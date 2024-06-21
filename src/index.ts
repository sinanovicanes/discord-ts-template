import { GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { Client } from "@/lib/client";
import env from "@/lib/utils/env";

const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

process.on("SIGINT", () => {
  discordClient.disconnect();
  process.exit();
});

const start = async () => {
  discordClient.connect(env.BOT_TOKEN);
};

start();
