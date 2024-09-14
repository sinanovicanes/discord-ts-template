import "dotenv/config";
import * as z from "zod";

export const envSchema = z.object({
  BOT_TOKEN: z.string({ message: "No bot token provided" }),
  BOT_CLIENT_ID: z.string({ message: "No bot client ID provided" }),
  NODE_ENV: z
    .union([z.literal("development"), z.literal("production")])
    .default("development")
});

const env = envSchema.parse(process.env);

export default env;
