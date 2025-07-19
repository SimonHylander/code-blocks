"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/web/components/ui/card";

import { ScrollArea } from "@repo/web/components/ui/scroll-area";
import { Skeleton } from "@repo/web/components/ui/skeleton";

export function BlockListSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Blocks</CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-24" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="h-22 w-full" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
