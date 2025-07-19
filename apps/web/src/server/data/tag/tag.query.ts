import { eq } from "drizzle-orm";
import { db } from "../../db";
import { toDTO } from "./tag.mapper";
import { schema } from "../../db/schema";

async function listAll() {
  const tags = await db.query.blockTags.findMany();
  return tags.map((tag) => toDTO(tag));
}

async function getById(id: number) {
  const tag = await db.query.blockTags.findFirst({
    where: eq(schema.blockTags.id, id),
  });

  if (!tag) {
    return null;
  }

  return toDTO(tag);
}

async function getByBlockId(blockId: number) {
  const tags = await db.query.blockTags.findMany({
    where: eq(schema.blockTags.blockId, blockId),
  });

  return tags.map((tag) => toDTO(tag));
}

async function getUniqueTags() {
  const tags = await db.query.blockTags.findMany();
  const uniqueTags = [...new Set(tags.map((tag) => tag.tag))].filter(Boolean);
  return uniqueTags;
}

export const tagQuery = {
  listAll,
  getById,
  getByBlockId,
  getUniqueTags,
};
