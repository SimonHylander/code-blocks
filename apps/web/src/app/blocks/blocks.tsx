"use server";

import { api } from "@repo/web/trpc/server";
import { BlockList } from "./block-list";

export async function Blocks() {
  const blocks = await api.block.list(undefined);

  return <BlockList blocks={blocks} />;
}
