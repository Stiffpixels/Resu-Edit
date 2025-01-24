import { relations, sql } from "drizzle-orm";
import {
    index,
    int,
    primaryKey,
    sqliteTableCreator,
    text,
} from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid"
export const createTable = sqliteTableCreator((name) => name);

const genNanoid = () => nanoid(12)

export const users = createTable(
    "users",
    {
        id: text("id", { length: 12 }).$defaultFn(genNanoid),
        name: text("name", { length: 255 }).notNull().unique(),
        email: text("email", { length: 255 }).notNull().unique(),
        filesId: text("files_id", { length: 12 }).$defaultFn(genNanoid),
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

export const files = createTable("files", {
    id: text("id", { length: 12 })
        .$defaultFn(genNanoid),
    key: text("key", { length: 255 }),
    url: text("url", { length: 255 }).notNull(),
    placeholdersId: text("placeholders_id")
}, (user) => {
    return {
        files_pk: primaryKey({ columns: [user.id, user.key] }),
    }
});

export const usersRelations = relations(files, ({ one }) => ({
	author: one(users, {
		fields: [files.id],
		references: [users.filesId],
	}),
}));

export const placeholders = createTable("placeholders", {
    id: text("id", {length:12}).$defaultFn(genNanoid),
    name:text("name", {length:255}),
    type:text("type", {length:255}).notNull().unique(),
},(placeholder)=>{
    return {
        placeholder_pk:primaryKey({columns:[placeholder.id, placeholder.name]})
    }
})

export const postsRelations = relations(placeholders, ({ one }) => ({
	author: one(files, {
		fields: [placeholders.id],
		references: [files.placeholdersId],
	}),
}));

