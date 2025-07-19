// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index } from "drizzle-orm/pg-core";
import { createTable } from "./create-table";

import { blocks } from "@repo/web/server/model/block.model";
import { blockTags } from "@repo/web/server/model/block-tag.model";
import { snippets } from "@repo/web/server/model/snippet.model";

export { blocks, blockTags, snippets };

export const schema = {
  blocks,
  snippets,
  blockTags,
};

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)],
);
