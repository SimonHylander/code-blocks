import { Snippet } from "@repo/web/server/model/snippet.model";

export function toDTO(snippet: Snippet) {
  return {
    id: snippet.id,
    name: snippet.name ?? "",
    content: snippet.content ?? "",
    language: snippet.language ?? "",
    blockId: snippet.blockId,
    // createdAt: snippet.createdAt,
    // updatedAt: snippet.updatedAt,
  };
}

export type SnippetDTO = ReturnType<typeof toDTO>;
