import { blockMutation } from "./block/block.mutation";
import { blockQuery } from "./block/block.query";

import { snippetQuery } from "./snippet/snippet.query";
import { snippetMutation } from "./snippet/snippet.mutation";

import { tagQuery } from "./tag/tag.query";
import { tagMutation } from "./tag/tag.mutation";

export const data = {
  block: {
    query: blockQuery,
    mutation: blockMutation,
  },
  snippet: {
    query: snippetQuery,
    mutation: snippetMutation,
  },
  tag: {
    query: tagQuery,
    mutation: tagMutation,
  },
};
