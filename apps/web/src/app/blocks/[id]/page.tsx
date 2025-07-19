import { Suspense } from "react";
import { BlockListSkeleton } from "../block-list-skeleton";
import BlockEditor from "../block-editor";

import { blockQuery } from "@repo/web/server/data/block/block.query";
import { redirect } from "next/navigation";
import { Blocks } from "../blocks";
import { SnippetForm } from "../snippet-form";
import { BlockForm } from "../block-form";

export async function generateStaticParams() {
  const blocks = await blockQuery.listAll();

  return blocks.map((block) => ({
    id: block.id.toString(),
  }));
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return redirect("/blocks");
  }

  const block = await blockQuery.getById(Number(id));

  if (!block) {
    return redirect("/blocks");
  }

  return (
    <main className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex w-full flex-col gap-4 md:col-span-2">
          <BlockForm block={block ?? null} />

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Snippets</h2>
            <SnippetForm block={block ?? null} />
          </div>
        </div>

        <Suspense fallback={<BlockListSkeleton />}>
          <Blocks />
        </Suspense>
      </div>
    </main>
  );
}
