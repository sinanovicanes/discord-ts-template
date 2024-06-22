import "dotenv/config";
import "reflect-metadata";
import { ClientOptions, GatewayIntentBits } from "discord.js";
import { Client } from "@/lib/client";
import env from "@/lib/utils/env";
import { container } from "tsyringe";

const clientOptions: ClientOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
};

container.register("ClientOptions", { useValue: clientOptions });

const discordClient = container.resolve(Client);

process.on("SIGINT", () => {
  discordClient.disconnect();
  process.exit();
});

const start = async () => {
  discordClient.connect(env.BOT_TOKEN);
};

start();
