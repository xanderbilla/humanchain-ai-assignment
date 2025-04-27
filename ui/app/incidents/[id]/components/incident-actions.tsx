"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { deleteIncident } from "@/lib/api";

interface IncidentActionsProps {
  readonly incidentId: string;
  readonly onError: (error: string) => void;
}

export default function IncidentActions({
  incidentId,
  onError,
}: IncidentActionsProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteIncident(incidentId);
      router.push("/");
    } catch (err) {
      onError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Button variant="destructive" onClick={handleDelete}>
            Delete Incident
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
