import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/database"; // your drizzle instance
import * as authSchemas from "@/data/db-schemas/auth-schema"

export const auth = betterAuth({
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }
  },
  database: drizzleAdapter(db, {
    schema: authSchemas,
    provider: "sqlite", // or "mysql", "sqlite"
  }),
});