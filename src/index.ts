import { GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { BotClient } from "./client";
import env from "./utils/env";

const botClient = new BotClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

process.on("SIGINT", () => {
  botClient.disconnect();
  process.exit();
});

const start = async () => {
  botClient.connect(env.BOT_TOKEN);
};

start();
