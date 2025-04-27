"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, ArrowUp, ArrowDown, FileX } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Incident {
  id: string;
  title: string;
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  reportedAt: string;
}

interface IncidentListProps {
  readonly incidents: Incident[];
  readonly onDelete: (id: string) => void;
  readonly sortConfig: {
    key: keyof Incident;
    direction: "asc" | "desc";
  } | null;
  readonly onSort: (key: keyof Incident) => void;
  readonly searchQuery: string;
  readonly filters: {
    severity: string;
    startDate: string;
    endDate: string;
  };
}

export function IncidentList({
  incidents,
  onDelete,
  sortConfig,
  onSort,
  searchQuery,
  filters,
}: IncidentListProps) {
  const router = useRouter();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "HIGH":
        return "destructive";
      case "MEDIUM":
        return "secondary";
      case "LOW":
        return "default";
      default:
        return "default";
    }
  };

  const getSortIcon = (key: keyof Incident) => {
    if (sortConfig?.key !== key)
      return <ArrowUp className="h-4 w-4 opacity-30" />;
    return sortConfig?.direction === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const handleViewIncident = (incident: Incident) => {
    router.push(`/incidents/${incident.id}`);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Incidents</h2>
      </CardHeader>
      <CardContent>
        {incidents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileX className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">
              No incidents found
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {searchQuery ||
              filters.severity !== "all" ||
              filters.startDate ||
              filters.endDate
                ? "Try adjusting your search or filters"
                : "Create a new incident to get started"}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onSort("severity")}
                >
                  <div className="flex items-center gap-1">
                    Severity
                    {getSortIcon("severity")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onSort("reportedAt")}
                >
                  <div className="flex items-center gap-1">
                    Reported At
                    {getSortIcon("reportedAt")}
                  </div>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell>{incident.title}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(incident.severity)}>
                      {incident.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(incident.reportedAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewIncident(incident)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(incident.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
