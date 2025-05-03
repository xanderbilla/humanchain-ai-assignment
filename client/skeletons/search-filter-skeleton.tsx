"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SearchFilterSkeleton() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-full max-w-md" />
            <Skeleton className="h-10 w-[150px]" />
          </div>
          <div className="flex gap-4 items-center">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10 w-[180px]" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-[150px]" />
              <Skeleton className="h-4 w-[30px]" />
              <Skeleton className="h-10 w-[150px]" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
