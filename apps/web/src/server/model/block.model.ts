import { sql } from "drizzle-orm";
import { index } from "drizzle-orm/pg-core";
import { createTable } from "../db/create-table";

export const blocks = createTable(
  "block",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [index("block_name_idx").on(t.name)],
);

export type Block = typeof blocks.$inferSelect;
export type InsertBlock = typeof blocks.$inferInsert;
export type UpdateBlock = Partial<InsertBlock>;
