"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchIncident } from "@/lib/api";

interface Incident {
  description: string;
}

interface IncidentDescriptionProps {
  readonly incidentId: string;
  readonly onError: (error: string) => void;
}

export default function IncidentDescription({
  incidentId,
  onError,
}: IncidentDescriptionProps) {
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIncident = async () => {
      try {
        const data = await fetchIncident(incidentId);
        setIncident(data);
      } catch (err) {
        onError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadIncident();
  }, [incidentId, onError]);

  if (loading) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{incident?.description}</p>
      </CardContent>
    </Card>
  );
}
