"use client";

import { CheckIcon, ClipboardIcon, CodeIcon } from "lucide-react";
import * as React from "react";
import { NpmCommands } from "../../app/types/unist";
import { Button } from "./button";
import { copyToClipboardWithMeta } from "./copy-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export function CodeBlock({
  code,
  name,
}: React.ComponentProps<"pre"> & NpmCommands & { code: string; name: string }) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const copyCommand = React.useCallback(() => {
    copyToClipboardWithMeta(code, {
      name: "copy_chunk_code",
      properties: {
        command: code,
      },
    });

    setHasCopied(true);
  }, [code]);

  return (
    <div className="bg-primary relative overflow-x-auto rounded-xl">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-indigo-950 px-3 pt-2.5">
        <div className="h-7 translate-y-[2px] gap-3 bg-transparent p-0 pl-1">
          <div className="flex items-center gap-2 rounded-none border-b border-transparent bg-transparent p-0 pb-1.5 font-mono text-sm text-purple-200 data-[state=active]:border-b-zinc-50 data-[state=active]:bg-transparent data-[state=active]:text-zinc-50">
            <CodeIcon className="h-4 w-4" />
            {name}
          </div>
        </div>
      </div>

      <div className="bg-background overflow-x-auto">
        <div className="mt-0">
          <pre className="bg-background px-4 py-5">
            <code
              className="relative font-mono text-sm leading-none text-purple-200"
              data-language="typescript"
            >
              {code}
            </code>
          </pre>
        </div>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2.5 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3"
            onClick={copyCommand}
          >
            <span className="sr-only">Copied</span>
            {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>{hasCopied ? "Copied" : "Copy to clipboard"}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
