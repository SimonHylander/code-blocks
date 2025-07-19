"use client";

import { Badge } from "@repo/web/components/ui/badge";
import { CodeBlock } from "@repo/web/components/ui/code-block";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/web/components/ui/dialog";

import { snippetDialogAtom } from "@repo/web/state/snippet.atom";
import { useAtom } from "jotai";

export function SnippetCodeDialog() {
  const [snippetDialog, setSnippetDialog] = useAtom(snippetDialogAtom);
  const { snippet } = snippetDialog;

  const handleOpenChange = (open: boolean) =>
    setSnippetDialog({ ...snippetDialog, isOpen: open });

  return (
    <Dialog open={snippetDialog.isOpen} onOpenChange={handleOpenChange}>
      {snippet && (
        <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="flex flex-col gap-2 text-xl font-bold">
              {snippet.name}
              {/* <Badge className="text-xs">Typescript</Badge> */}
            </DialogTitle>
          </DialogHeader>
          <CodeBlock name={snippet.name} code={snippet.content} />
        </DialogContent>
      )}
    </Dialog>
  );
}
