import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: [
    './src/data/db-schemas/auth-schema.ts',
    './src/data/db-schemas/box-schema.ts',
    './src/data/db-schemas/link-schema.ts',
  ],
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string,
  },
});
