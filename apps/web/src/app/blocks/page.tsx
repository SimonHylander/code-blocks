import { HydrateClient } from "@repo/web/trpc/server";
import { Suspense } from "react";
import { BlockListSkeleton } from "./block-list-skeleton";

import { BlockForm } from "./block-form";
import { Blocks } from "./blocks";
import { SnippetForm } from "./snippet-form";

export default async function BlocksPage() {
  return (
    <HydrateClient>
      <main className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex w-full flex-col gap-4 md:col-span-2">
            <BlockForm block={null} />

            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold">Snippets</h2>
              <SnippetForm block={null} />
            </div>
          </div>

          <Suspense fallback={<BlockListSkeleton />}>
            <Blocks />
          </Suspense>
        </div>
      </main>
    </HydrateClient>
  );
}
