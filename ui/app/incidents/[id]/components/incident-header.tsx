"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchIncident } from "@/lib/api";

interface Incident {
  id: string;
  title: string;
}

interface IncidentHeaderProps {
  readonly incidentId: string;
  readonly onError: (error: string) => void;
}

export default function IncidentHeader({
  incidentId,
  onError,
}: IncidentHeaderProps) {
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
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{incident?.title}</CardTitle>
        <CardDescription>Incident ID: {incident?.id}</CardDescription>
      </CardHeader>
    </Card>
  );
}
