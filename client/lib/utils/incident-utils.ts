import { Incident } from "@/types/incident";

const matchesSearchQuery = (
  incident: Incident,
  searchQuery: string
): boolean => {
  if (!searchQuery) return true;
  const normalizedQuery = searchQuery.toLowerCase();
  return (incident.title || "").toLowerCase().includes(normalizedQuery);
};

const matchesSeverityFilter = (
  incident: Incident,
  severity: string
): boolean => {
  if (!severity || severity === "all") return true;
  return incident.severity === severity;
};

const matchesDateRange = (
  incident: Incident,
  startDate: string | null,
  endDate: string | null
): boolean => {
  const incidentDate = incident.reportedAt
    ? new Date(incident.reportedAt)
    : null;
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  if (!start && !end) return true;
  if (start && (!incidentDate || incidentDate < start)) return false;
  if (end && (!incidentDate || incidentDate > end)) return false;
  return true;
};

export const filterIncidents = (
  incidents: Incident[],
  searchQuery: string,
  filters: {
    severity: string;
    startDate: string;
    endDate: string;
  }
): Incident[] => {
  if (!Array.isArray(incidents)) return [];

  return incidents.filter((incident) => {
    if (!incident) return false;

    return (
      matchesSearchQuery(incident, searchQuery) &&
      matchesSeverityFilter(incident, filters.severity) &&
      matchesDateRange(incident, filters.startDate, filters.endDate)
    );
  });
};

type Severity = "LOW" | "MEDIUM" | "HIGH";

const compareDates = (
  dateA: string | undefined,
  dateB: string | undefined,
  direction: "asc" | "desc"
): number => {
  const timeA = dateA ? new Date(dateA).getTime() : 0;
  const timeB = dateB ? new Date(dateB).getTime() : 0;
  return direction === "asc" ? timeA - timeB : timeB - timeA;
};

const compareSeverity = (
  severityA: Severity,
  severityB: Severity,
  direction: "asc" | "desc"
): number => {
  const severityOrder: Record<Severity, number> = {
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2,
  };
  const orderA = severityOrder[severityA] ?? -1;
  const orderB = severityOrder[severityB] ?? -1;
  return direction === "asc" ? orderA - orderB : orderB - orderA;
};

const compareValues = <T>(
  valueA: T | undefined | null,
  valueB: T | undefined | null,
  direction: "asc" | "desc"
): number => {
  if (
    (valueA === undefined || valueA === null) &&
    (valueB === undefined || valueB === null)
  )
    return 0;
  if (valueA === undefined || valueA === null)
    return direction === "asc" ? -1 : 1;
  if (valueB === undefined || valueB === null)
    return direction === "asc" ? 1 : -1;
  if (valueA < valueB) return direction === "asc" ? -1 : 1;
  if (valueA > valueB) return direction === "asc" ? 1 : -1;
  return 0;
};

export const sortIncidents = (
  incidents: Incident[],
  sortConfig: { key: keyof Incident; direction: "asc" | "desc" } | null
): Incident[] => {
  if (!Array.isArray(incidents)) return [];
  if (!sortConfig?.key) return incidents;

  return [...incidents].sort((a, b) => {
    if (!a || !b) return 0;

    if (sortConfig.key === "reportedAt") {
      return compareDates(a.reportedAt, b.reportedAt, sortConfig.direction);
    }

    if (sortConfig.key === "severity") {
      return compareSeverity(
        a.severity as Severity,
        b.severity as Severity,
        sortConfig.direction
      );
    }

    const key = sortConfig.key as keyof Incident;
    return compareValues(a[key], b[key], sortConfig.direction);
  });
};
