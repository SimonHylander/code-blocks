"use client";

import { CheckIcon, ClipboardIcon } from "lucide-react";
import * as React from "react";
import { NpmCommands } from "../../app/types/unist";
import { useConfig } from "../../hooks/use-config";
import { Button } from "./button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { copyToClipboardWithMeta } from "./copy-button";

export function CodeBlockCommand({
  __npmCommand__,
  __pnpmCommand__,
}: React.ComponentProps<"pre"> & NpmCommands) {
  const [config, setConfig] = useConfig();
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const packageManager = config.packageManager || "pnpm";

  const tabs = React.useMemo(() => {
    return {
      npm: __npmCommand__,
      pnpm: __pnpmCommand__,
    };
  }, [__npmCommand__, __pnpmCommand__]);

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager as keyof typeof tabs];

    if (!command) {
      return;
    }

    copyToClipboardWithMeta(command, {
      name: "copy_npm_command",
      properties: {
        command,
        pm: packageManager,
      },
    });
    setHasCopied(true);
  }, [packageManager, tabs]);

  return (
    <div className="relative mt-6 max-h-[650px] overflow-x-auto rounded-xl bg-zinc-950 dark:bg-zinc-900">
      <Tabs
        value={packageManager}
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm",
          });
        }}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3 pt-2.5">
          <TabsList className="h-7 translate-y-[2px] gap-3 bg-transparent p-0 pl-1">
            {Object.entries(tabs).map(([key, value]) => {
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="rounded-none border-b border-transparent bg-transparent p-0 pb-1.5 font-mono text-purple-200 data-[state=active]:border-b-zinc-50 data-[state=active]:bg-transparent data-[state=active]:text-zinc-50"
                >
                  {key}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        <div className="overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => {
            return (
              <TabsContent key={key} value={key} className="mt-0">
                <pre className="px-4 py-5">
                  <code
                    className="relative font-mono text-sm leading-none text-purple-200"
                    data-language="bash"
                  >
                    {value}
                  </code>
                </pre>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>

      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2.5 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3"
        onClick={copyCommand}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
      </Button>
    </div>
  );
}
