// turso
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.DB_URL as string,
  authToken: process.env.DB_AUTH_TOKEN,
});

const db = drizzle(client, {
  logger: process.env.NODE_ENV === 'development' ? true : false,
});

export default db;
