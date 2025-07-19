import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/web/components/ui/card";

import { Skeleton } from "@repo/web/components/ui/skeleton";

export function BlockFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <Skeleton className="h-[20px] w-[100px]" />
          </CardTitle>

          <CardDescription>
            <Skeleton className="h-[20px] w-[200px]" />
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <Skeleton className="h-[15px] w-[100px]" />
          <Skeleton className="h-[30px] w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
