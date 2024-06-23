import { Client } from "@/lib/client";
import { CLIENT_OPTIONS_KEY } from "@/lib/constants";
import env from "@/lib/utils/env";
import { ClientOptions, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import "reflect-metadata";
import { container } from "tsyringe";

const clientOptions: ClientOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
};

container.register(CLIENT_OPTIONS_KEY, { useValue: clientOptions });

const discordClient = container.resolve(Client);

process.on("SIGINT", () => {
  discordClient.disconnect();
  process.exit();
});

const start = async () => {
  discordClient.connect(env.BOT_TOKEN);
};

start();
