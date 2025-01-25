import { relations, sql } from "drizzle-orm";
import {
    index,
    int,
    integer, primaryKey,
    sqliteTableCreator,
    text,
} from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid"
import type { AdapterAccountType } from "next-auth/adapters"
export const createTable = sqliteTableCreator((name) => name);

const genNanoid = () => nanoid(12)

export const users = createTable(
    "users",
    {
        id: text("id", { length: 12 }).primaryKey().notNull().$defaultFn(genNanoid),
        name: text("name", { length: 255 }).unique().$defaultFn(() => {
            const nameArr = ["McDoughnut", "Dominuts", "ResuKing", "UnimaginablyCool"]
            return nameArr[Math.floor(Math.random() * 4)]!
        }),
        email: text("email", { length: 255 }).notNull().unique(),
        image: text("image"),
        emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
        createdAt: int("created_at", { mode: "timestamp" })
            .default(sql`(unixepoch())`)
            .notNull(),
        updatedAt: int("updatedAt", { mode: "timestamp" }).$onUpdate(
            () => new Date()
        ),
    },
    (post) => ({
        nameIndex: index("name_idx").on(post.name),
    })
);

export const userRelations = relations(users, ({ one }) => ({
    userFiles: one(files),
}));

export const files = createTable("files", {
    id: text("id", { length: 12 })
        .$defaultFn(genNanoid),
    key: text("key", { length: 255 }),
    userId: text("user_id", { length: 12 }).$defaultFn(genNanoid).references(() => users.id),
}, (user) => {
    return {
        files_pk: primaryKey({ columns: [user.id, user.key] }),
    }
});

export const fileRelations = relations(files, ({ one }) => ({
    filePlaceholdes: one(placeholders),
}));

export const placeholders = createTable("placeholders", {
    fileId: text("file_id").references(() => files.id),
    name: text("name", { length: 255 }),
    type: text("type", { length: 255 }).notNull().unique(),
}, (placeholder) => {
    return {
        placeholder_pk: primaryKey({ columns: [placeholder.fileId, placeholder.name] })
    }
})

export const accounts = createTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
)

export const verificationTokens = createTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    })
)

export const authenticators = createTable(
    "authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: integer("credentialBackedUp", {
            mode: "boolean",
        }).notNull(),
        transports: text("transports"),
    },
    (authenticator) => ({
        compositePK: primaryKey({
            columns: [authenticator.userId, authenticator.credentialID],
        }),
    })
)

export const sessions = createTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
})

