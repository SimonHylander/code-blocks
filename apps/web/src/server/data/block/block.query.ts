import { asc, eq, ilike, inArray } from "drizzle-orm";
import { db } from "../../db";
import { toDTO } from "./block.mapper";
import { schema } from "../../db/schema";

async function listAll(search?: string) {
  const blocks = await db.query.blocks.findMany({
    where: search ? ilike(schema.blocks.name, `%${search}%`) : undefined,
  });

  const blockIds = blocks.map((block) => block.id);

  const snippets = await db.query.snippets.findMany({
    where: inArray(schema.snippets.blockId, blockIds),
    orderBy: [asc(schema.snippets.blockId), asc(schema.snippets.sortOrder)],
  });

  const tags = await db.query.blockTags.findMany({
    where: inArray(schema.blockTags.blockId, blockIds),
  });

  return blocks.map((block) => {
    const blockSnippets = snippets.filter(
      (snippet) => snippet.blockId === block.id,
    );
    blockSnippets.sort((a, b) => a.sortOrder - b.sortOrder);

    const blockTags = tags.filter((tag) => tag.blockId === block.id);

    return toDTO(block, blockTags, blockSnippets);
  });
}

async function getById(id: number) {
  const block = await db.query.blocks.findFirst({
    where: eq(schema.blocks.id, id),
  });

  if (!block) {
    return null;
  }

  const snippets = await db.query.snippets.findMany({
    where: eq(schema.snippets.blockId, id),
  });

  const tags = await db.query.blockTags.findMany({
    where: eq(schema.blockTags.blockId, id),
  });

  return toDTO(block, tags, snippets);
}

export const blockQuery = {
  listAll,
  getById,
};
