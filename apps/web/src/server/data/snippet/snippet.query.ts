import { eq, inArray } from "drizzle-orm";
import { db } from "../../db";
import { toDTO } from "./snippet.mapper";
import { schema } from "../../db/schema";

async function listAll() {
  const snippets = await db.query.snippets.findMany();
  return snippets.map((snippet) => toDTO(snippet));
}

async function getById(id: number) {
  const snippet = await db.query.snippets.findFirst({
    where: eq(schema.snippets.id, id),
  });

  if (!snippet) {
    return null;
  }

  return toDTO(snippet);
}

async function listByBlockId(blockId: number) {
  const snippets = await db.query.snippets.findMany({
    where: eq(schema.snippets.blockId, blockId),
  });

  return snippets.map((snippet) => toDTO(snippet));
}

async function getByBlockId(blockId: number) {
  const snippets = await db.query.snippets.findMany({
    where: eq(schema.snippets.blockId, blockId),
  });

  return snippets.map((snippet) => toDTO(snippet));
}

export const snippetQuery = {
  listAll,
  listByBlockId,
  getById,
  getByBlockId,
};
