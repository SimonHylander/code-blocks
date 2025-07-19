import { blockRouter } from "@repo/web/server/api/routers/block.router";

import {
  createCallerFactory,
  createTRPCRouter,
} from "@repo/web/server/api/trpc";
import { snippetRouter } from "./routers/snippet.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  block: blockRouter,
  snippet: snippetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
