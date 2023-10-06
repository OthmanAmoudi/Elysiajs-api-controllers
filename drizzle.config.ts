import { config } from 'dotenv';
config(); // for some reason env vars wont load in this file
import type { Config } from 'drizzle-kit';
export default {
  out: './drizzle',
  schema: './src/database/schema.ts',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DB_URL!,
    authToken: process.env.DB_AUTH_TOKEN,
  },
  // for local
  // driver: 'better-sqlite',
  // dbCredentials: {
  //   url: 'local.db',
  // },
} satisfies Config;
