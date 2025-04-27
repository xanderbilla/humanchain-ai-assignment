"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  AlertCircle,
  AlertOctagon,
  Calendar,
} from "lucide-react";
import { Incident } from "@/types/incident";
import { fetchIncident } from "@/lib/api";

interface IncidentMetadataProps {
  readonly incidentId: string;
  readonly onError: (error: string) => void;
}

export default function IncidentMetadata({
  incidentId,
  onError,
}: IncidentMetadataProps) {
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
    return null; // Loading state is handled by Suspense
  }

  if (!incident) {
    return null;
  }

  const getSeverityIcon = () => {
    switch (incident.severity) {
      case "LOW":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "MEDIUM":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "HIGH":
        return <AlertOctagon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getBadgeVariant = (severity: string) => {
    if (severity === "HIGH") return "destructive";
    if (severity === "MEDIUM") return "secondary";
    return "default";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incident Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              Severity
            </div>
            <div className="flex items-center gap-2">
              {getSeverityIcon()}
              <Badge variant={getBadgeVariant(incident.severity)}>
                {incident.severity}
              </Badge>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              Reported At
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>{formatDate(incident.reportedAt)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
