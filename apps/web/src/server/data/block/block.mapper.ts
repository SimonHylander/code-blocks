import { Block } from "@repo/web/server/model/block.model";
import { BlockTag } from "@repo/web/server/model/block-tag.model";
import { Snippet } from "@repo/web/server/model/snippet.model";

export function toDTO(block: Block, tags: BlockTag[], snippets: Snippet[]) {
  return {
    id: block.id,
    name: block.name ?? "",
    tags: tags.map((tag) => ({
      id: tag.id,
      tag: tag.tag ?? "",
    })),
    snippets: snippets.map((snippet) => ({
      id: snippet.id,
      blockId: snippet.blockId,
      sortOrder: snippet.sortOrder,
      name: snippet.name ?? "",
      content: snippet.content ?? "",
      language: snippet.language ?? "",
    })),
  };
}

export type BlockDTO = ReturnType<typeof toDTO>;
