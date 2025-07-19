import { BlockFormSkeleton } from "./block-form-skeleton";
import { SnippetFormSkeleton } from "./snippet-form";

export function BlockEditorSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4 md:col-span-2">
      <BlockFormSkeleton />

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">Snippets</h2>
        <SnippetFormSkeleton />
      </div>
    </div>
  );
}
