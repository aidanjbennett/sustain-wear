import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  database: prismaAdapter(db, {
    provider: "sqlite",
  }),

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "Donor",
        input: false,
      },
    },
  },

  trustedOrigins: ["http://localhost:3000"],
  plugins: [nextCookies()]
});