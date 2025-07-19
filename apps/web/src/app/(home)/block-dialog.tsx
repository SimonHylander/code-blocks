"use client";

import { Badge } from "@repo/web/components/ui/badge";
import { CodeBlock } from "@repo/web/components/ui/code-block";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/web/components/ui/dialog";
import { ScrollArea } from "@repo/web/components/ui/scroll-area";
import { blockDialogAtom } from "@repo/web/state/block.atom";

import { useAtom } from "jotai";

export function BlockDialog() {
  const [dialog, setDialog] = useAtom(blockDialogAtom);
  const { block } = dialog;

  const handleOpenChange = (open: boolean) =>
    setDialog({ ...dialog, isOpen: open });

  return (
    <Dialog open={dialog.isOpen} onOpenChange={handleOpenChange}>
      {block && (
        <DialogContent className="sm:max-w-[425px] md:max-w-[800px] px-0">
          <ScrollArea className="max-h-[500px]">
            <div className="flex flex-col gap-4 px-4">
              <DialogHeader>
                <DialogTitle className="flex flex-col gap-2 text-xl font-bold">
                  {block.name}

                  <div className="flex gap-2">
                    <span className="text-muted-foreground text-sm">Tags:</span>
                    <Badge variant="secondary" className="text-xs">
                      Typescript
                    </Badge>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
                {block.snippets.map((snippet) => (
                  <CodeBlock
                    key={snippet.id}
                    name={snippet.name}
                    code={snippet.content}
                  />
                ))}
            </div>
          </ScrollArea>
        </DialogContent>
      )}
    </Dialog>
  );
}
