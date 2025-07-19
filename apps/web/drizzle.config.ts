import { type Config } from "drizzle-kit";

import { env } from "@repo/web/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["code_blocks_*"],
} satisfies Config;
