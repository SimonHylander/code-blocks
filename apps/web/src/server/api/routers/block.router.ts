import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@repo/web/server/api/trpc";
import { InsertBlock } from "../../model/block.model";

export const blockRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.object({ search: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      return await ctx.data.block.query.listAll(input?.search);
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.data.block.query.getById(input.id);
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const block: InsertBlock = {
        name: input.name,
      };

      const createdBlock = await ctx.data.block.mutation.create(block);

      return createdBlock ? createdBlock.id : null;
    }),

  update: publicProcedure
    .input(z.object({ id: z.number(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.data.block.query.getById(input.id);

      if (!existing) {
        return null;
      }

      const updatedBlock = await ctx.data.block.mutation.update(existing.id, {
        ...existing,
        name: input.name,
      });

      return updatedBlock ? updatedBlock.id : null;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.data.block.mutation.delete(input.id);
    }),
});
