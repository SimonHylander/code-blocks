import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@repo/web/server/api/trpc";
import { InsertBlock } from "../../model/block.model";
import { InsertSnippet } from "../../model/snippet.model";

export const snippetRouter = createTRPCRouter({
  save: publicProcedure
    .input(
      z.object({
        blockId: z.number(),
        snippets: z.array(
          z.object({
            id: z.number().nullish(),
            name: z.string().min(1),
            content: z.string().min(1),
            language: z.string().min(1),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { blockId } = input;

      const existingSnippets =
        await ctx.data.snippet.query.listByBlockId(blockId);
      const existingSnippetIds = existingSnippets.map((s) => s.id);

      const newSnippets: InsertSnippet[] = input.snippets
        .filter((s) => !s.id)
        .map((snippet) => ({
          name: snippet.name,
          blockId,
          language: snippet.language,
          content: snippet.content,
        }));

      if (newSnippets.length > 0) {
        await ctx.data.snippet.mutation.batchCreate(newSnippets);
      }

      const snippetsToUpdate = input.snippets.filter(
        (snippet) =>
          snippet.id !== null &&
          snippet.id !== undefined &&
          snippet.id > 0 &&
          existingSnippetIds.includes(snippet.id),
      );

      if (snippetsToUpdate.length > 0) {
        await Promise.all(
          snippetsToUpdate.map((snippet) =>
            ctx.data.snippet.mutation.update(snippet.id!, {
              name: snippet.name,
              language: snippet.language,
              content: snippet.content,
            }),
          ),
        );
      }
    }),
});
