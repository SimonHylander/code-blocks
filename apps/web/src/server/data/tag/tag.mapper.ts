import { BlockTag } from "@repo/web/server/model/block-tag.model";

export function toDTO(tag: BlockTag) {
  return {
    id: tag.id,
    tag: tag.tag ?? "",
    blockId: tag.blockId,
    createdAt: tag.createdAt,
  };
}

export type TagDTO = ReturnType<typeof toDTO>;
