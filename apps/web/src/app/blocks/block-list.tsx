"use client";

import { AlertDialogAction } from "@repo/web/components/ui/alert-dialog";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/web/components/ui/alert-dialog";

import { Badge } from "@repo/web/components/ui/badge";

import { Button, buttonVariants } from "@repo/web/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/web/components/ui/card";

import { ScrollArea } from "@repo/web/components/ui/scroll-area";
import { Separator } from "@repo/web/components/ui/separator";
import { cn } from "@repo/web/lib/utils";
import { BlockDTO } from "@repo/web/server/data/block/block.mapper";
import { blockIdAtom } from "@repo/web/state/block.atom";
import { api } from "@repo/web/trpc/react";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Code, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function BlockList({ blocks }: { blocks: BlockDTO[] }) {
  const router = useRouter();

  const utils = api.useUtils();
  const { mutateAsync: deleteBlock } = api.block.delete.useMutation();

  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      javascript: "bg-yellow-100 text-yellow-800",
      typescript: "bg-blue-100 text-blue-800",
      python: "bg-green-100 text-green-800",
      java: "bg-orange-100 text-orange-800",
      cpp: "bg-purple-100 text-purple-800",
      css: "bg-pink-100 text-pink-800",
      html: "bg-red-100 text-red-800",
      sql: "bg-indigo-100 text-indigo-800",
      json: "bg-gray-100 text-gray-800",
      markdown: "bg-slate-100 text-slate-800",
    };
    return colors[lang] || "bg-gray-100 text-gray-800";
  };

  const handleDelete = async (id: number) => {
    await deleteBlock({ id });
    utils.block.list.invalidate();
  };

  useEffect(() => {
    if (blocks.length > 0) {
      const timeoutId = setTimeout(() => {
        blocks.forEach((block) => {
          router.prefetch(`/blocks/${block.id}`);
        });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [blocks, router]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Blocks</CardTitle>
        <CardDescription>
          {blocks.length} block{blocks.length !== 1 ? "s" : ""} saved
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          {blocks.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <Code className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>No snippets yet</p>
              <p className="text-sm">Create your first snippet!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {blocks.map((block) => (
                <div key={block.id}>
                  <div className="group rounded-lg border p-3 transition-colors hover:bg-slate-700">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="mr-2 flex-1 truncate text-sm font-medium">
                        {block.name}
                      </h3>

                      {block.tags.map((tag) => (
                        <Badge
                          variant="secondary"
                          className={`text-xs ${getLanguageColor(tag.tag)}`}
                        >
                          {tag.tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-1">
                      <Link
                        href={`/blocks/${block.id}`}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "sm" }),
                          "hover:bg-primary h-7 cursor-pointer px-2",
                        )}
                      >
                        <Edit className="h-3 w-3" />
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-primary h-7 cursor-pointer px-2 text-red-600"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Block</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{block.name}
                              "? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(block.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
