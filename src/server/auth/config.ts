import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import { env } from "~/env";

import { db } from "~/server/db"; import {
    accounts,
    authenticators,
    users,
    verificationTokens,
} from "~/server/db/schema";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
    providers: [
        Nodemailer({
            server: {
                host: env.EMAIL_SERVER_HOST,
                port: env.EMAIL_SERVER_PORT,
                auth: {
                    user: env.EMAIL_SERVER_USER,
                    pass: env.EMAIL_SERVER_PASSWORD,
                },
            },
            normalizeIdentifier(identifier: string): string {
                // Get the first two elements only,
                // separated by `@` from user input.
                let [local, domain] = identifier.toLowerCase().trim().split("@")

                // The part before "@" can contain a ","
                // but we remove it on the domain part
                domain = domain?.split(",")[0]

                if (identifier.split("@").length > 2) {
                    throw new Error("Only one email allowed")
                }

                return `${local}@${domain}`
            },
        })
    ],
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        verificationTokensTable: verificationTokens,
    }),
    callbacks: {
        session: ({ session, user }) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
            },
        }),
    },
} satisfies NextAuthConfig;
