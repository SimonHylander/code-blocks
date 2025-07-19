import { sql } from "drizzle-orm";
import { index } from "drizzle-orm/pg-core";
import { createTable } from "../db/create-table";
import { blocks } from "./block.model";

export const snippets = createTable(
  "snippet",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    blockId: d
      .integer("block_id")
      .references(() => blocks.id)
      .notNull(),
    sortOrder: d.integer("sort_order").notNull().default(0),
    name: d.varchar({ length: 256 }),
    language: d.varchar({ length: 256 }),
    content: d.text(),
    createdAt: d
      // .timestamp("created_at", { withTimezone: true })
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("snippet_name_idx").on(t.name)],
);

export type Snippet = typeof snippets.$inferSelect;
export type InsertSnippet = typeof snippets.$inferInsert;
