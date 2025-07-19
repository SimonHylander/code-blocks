import { blocks } from "@repo/web/server/db/schema";
import { db } from "../../db";
import { InsertBlock, UpdateBlock } from "../../model/block.model";
import { eq } from "drizzle-orm";

async function create(block: InsertBlock) {
  const result = await db.insert(blocks).values(block).returning();
  return result?.[0];
}

async function update(id: number, block: UpdateBlock) {
  const result = await db
    .update(blocks)
    .set(block)
    .where(eq(blocks.id, block.id!))
    .returning();

  return result?.[0];
}

async function deleteBlock(id: number) {
  return await db.delete(blocks).where(eq(blocks.id, id));
}

export const blockMutation = {
  create,
  update,
  delete: deleteBlock,
};
