"use client";

import { BlockDTO } from "@repo/web/server/data/block/block.mapper";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/web/components/ui/card";

import { Button } from "@repo/web/components/ui/button";
import { copyToClipboardWithMeta } from "@repo/web/components/ui/copy-button";
import { ScrollArea } from "@repo/web/components/ui/scroll-area";
import { SnippetDTO } from "@repo/web/server/data/snippet/snippet.mapper";
import { blockDialogAtom } from "@repo/web/state/block.atom";
import { snippetDialogAtom } from "@repo/web/state/snippet.atom";
import { useAtom } from "jotai";

import {
  CheckIcon,
  ClipboardIcon,
  CodeIcon,
  CrossIcon,
  ExpandIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/web/components/ui/tooltip";

import { useCallback, useEffect, useState } from "react";
import { Input } from "@repo/web/components/ui/input";
import { api } from "@repo/web/trpc/react";
import { useDebounce } from "@repo/web/hooks/use-debounce";
import { BlockDialog } from "./block-dialog";
import { SnippetCodeDialog } from "./snippet-code-dialog";

export function BlockList({ blocks: initialBlocks }: { blocks: BlockDTO[] }) {
  const [_, setDialog] = useAtom(blockDialogAtom);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: blocks } = api.block.list.useQuery(
    { search: debouncedSearch },
    {
      enabled: debouncedSearch.length > 0,
      placeholderData: initialBlocks,
    },
  );

  return (
    <>
      <div className="relative mb-6">
        <SearchIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform cursor-pointer text-indigo-400" />
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-primary text-foreground border-2 border-indigo-600 py-6 pl-10 placeholder:text-indigo-400 focus:border-indigo-600"
        />

        {search.length > 0 && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-indigo-400 hover:text-indigo-600"
          >
            <XIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* <div className="mb-8 flex flex-wrap gap-2">
        {languages.map((language) => (
          <Badge
            key={language}
            variant={
              selectedLanguages.includes(language) ? "default" : "outline"
            }
            className={`cursor-pointer capitalize transition-colors ${
              selectedLanguages.includes(language)
                ? "text-foreground bg-purple-600 hover:bg-purple-700"
                : "border-slate-600 text-gray-300 hover:bg-slate-700"
            }`}
            onClick={() => toggleLanguage(language)}
          >
            {language}
          </Badge>
        ))}
      </div> */}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blocks?.map((block) => (
          <Card key={block.id}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>{block.name}</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer hover:bg-indigo-800"
                    onClick={() => setDialog({ isOpen: true, block })}
                  >
                    <ExpandIcon className="text-foreground h-4 w-4" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  <p>Expand</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[250px]">
                <div className="flex flex-col gap-4">
                  {block.snippets.map((snippet) => (
                    <Snippet key={snippet.id} snippet={snippet} />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>

      <BlockDialog />
      <SnippetCodeDialog />
    </>
  );
}

function Snippet({ snippet }: { snippet: SnippetDTO }) {
  const [_, setSnippetDialog] = useAtom(snippetDialogAtom);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const copyCommand = useCallback((code: string) => {
    copyToClipboardWithMeta(code, {
      name: "copy_chunk_code",
      properties: {
        command: code,
      },
    });

    setHasCopied(true);
  }, []);

  return (
    <div
      key={snippet.id}
      className="bg-primary border-accent flex items-center justify-between border-b-2 pb-1"
    >
      <div className="flex items-center gap-2">
        <CodeIcon className="h-4 w-4" />
        {snippet.name}
      </div>

      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="cursor-pointer hover:bg-slate-700"
              onClick={() => copyCommand(snippet.content)}
            >
              <span className="sr-only">Copied</span>
              {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>{hasCopied ? "Copied" : "Copy to clipboard"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              onClick={() => setSnippetDialog({ isOpen: true, snippet })}
              className="cursor-pointer hover:bg-indigo-800"
            >
              <ExpandIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>Expand</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
