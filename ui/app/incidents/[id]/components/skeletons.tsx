"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function HeaderSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </CardHeader>
    </Card>
  );
}

export function DescriptionSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </CardContent>
    </Card>
  );
}

export function MetadataSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Incident Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-8 w-1/2" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-8 w-1/2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ActionsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Skeleton className="h-10 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}
