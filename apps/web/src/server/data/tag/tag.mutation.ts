import { eq } from "drizzle-orm";
import { blockTags } from "@repo/web/server/db/schema";
import { db } from "../../db";
import { InsertBlockTag } from "../../model/block-tag.model";

type UpdateBlockTag = Partial<InsertBlockTag>;

async function create(tag: InsertBlockTag) {
  const result = await db.insert(blockTags).values(tag).returning();
  return result?.[0];
}

async function update(id: number, tag: UpdateBlockTag) {
  const result = await db
    .update(blockTags)
    .set(tag)
    .where(eq(blockTags.id, id))
    .returning();
  return result?.[0];
}

async function remove(id: number) {
  const result = await db
    .delete(blockTags)
    .where(eq(blockTags.id, id))
    .returning();
  return result?.[0];
}

async function removeByBlockId(blockId: number) {
  const result = await db
    .delete(blockTags)
    .where(eq(blockTags.blockId, blockId))
    .returning();
  return result;
}

export const tagMutation = {
  create,
  update,
  remove,
  removeByBlockId,
};
