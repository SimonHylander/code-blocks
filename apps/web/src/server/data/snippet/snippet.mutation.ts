import { eq } from "drizzle-orm";
import { schema } from "@repo/web/server/db/schema";
import { db } from "../../db";
import { InsertSnippet, snippets } from "../../model/snippet.model";

type UpdateSnippet = Partial<InsertSnippet>;

async function create(snippet: InsertSnippet) {
  const result = await db.insert(schema.snippets).values(snippet).returning();
  return result?.[0];
}

async function batchCreate(snippets: InsertSnippet[]) {
  return await db.insert(schema.snippets).values(snippets);
}

async function update(id: number, snippet: UpdateSnippet) {
  const result = await db
    .update(schema.snippets)
    .set(snippet)
    .where(eq(snippets.id, id))
    .returning();

  return result?.[0];
}

async function remove(id: number) {
  const result = await db
    .delete(schema.snippets)
    .where(eq(schema.snippets.id, id))
    .returning();

  return result?.[0];
}

export const snippetMutation = {
  create,
  batchCreate,
  update,
  remove,
};
