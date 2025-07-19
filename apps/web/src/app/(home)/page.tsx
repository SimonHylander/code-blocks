import { CodeIcon } from "lucide-react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { api, HydrateClient } from "@repo/web/trpc/server";
import { BlockList } from "./block-list";
import { env } from "@repo/web/env";
import { Button } from "@repo/web/components/ui/button";

export default async function Home() {
  const blocks = await api.block.list();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col gap-4">
        <header className="flex items-center justify-between">
          <div className="mb-8 flex items-center gap-3">
            <CodeIcon className="h-8 w-8 text-indigo-600" />
            <h1 className="text-foreground text-3xl font-bold">
              Code <span className="text-indigo-600">Blocks</span>
            </h1>
          </div>

          {env.NODE_ENV === "development" && (
            <SignedOut>
              <SignInButton>
                <Button variant="ghost" className="cursor-pointer">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          )}
        </header>

        <BlockList blocks={blocks} />
      </main>
    </HydrateClient>
  );
}
