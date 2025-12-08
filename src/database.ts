import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';

export const db = drizzle({
  connection: {
    url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL as string,
    authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN as string
  }
});
