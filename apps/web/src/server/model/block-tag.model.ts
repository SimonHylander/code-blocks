import { sql } from "drizzle-orm";
import { index } from "drizzle-orm/pg-core";
import { createTable } from "../db/create-table";
import { blocks } from "./block.model";

export const blockTags = createTable(
  "block_tag",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    blockId: d.integer("block_id").references(() => blocks.id),
    tag: d.varchar({ length: 256 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [index("block_tag_idx").on(t.tag)],
);

export type BlockTag = typeof blockTags.$inferSelect;
export type InsertBlockTag = typeof blockTags.$inferInsert;
