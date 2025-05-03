import { useState, useEffect, useMemo } from "react";
import { Incident } from "@/types/incident";
import { fetchIncidents, createIncident, deleteIncident } from "@/lib/api";
import { filterIncidents, sortIncidents } from "@/lib/utils/incident-utils";
import { toast } from "sonner";

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Incident;
    direction: "asc" | "desc";
  } | null>(null);
  const [filters, setFilters] = useState({
    severity: "all",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showNewIncidentForm, setShowNewIncidentForm] = useState(false);
  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    severity: "LOW" as "LOW" | "MEDIUM" | "HIGH",
  });

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    try {
      const data = await fetchIncidents();
      const sortedData = data.toSorted(
        (a, b) =>
          new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime()
      );
      setIncidents(sortedData);
      setError(null);
    } catch (error) {
      console.error("Error fetching incidents:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch incidents"
      );
      setIncidents([]);
    }
  };

  const filteredIncidents = useMemo(() => {
    return filterIncidents(incidents, searchQuery, filters);
  }, [incidents, searchQuery, filters]);

  const sortedIncidents = useMemo(() => {
    return sortIncidents(filteredIncidents, sortConfig);
  }, [filteredIncidents, sortConfig]);

  const handleNewIncidentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      await createIncident({
        title: newIncident.title,
        description: newIncident.description,
        severity: newIncident.severity,
        reportedAt: new Date().toISOString(),
      });

      await loadIncidents();

      toast.success("Incident created successfully", {
        description: `"${newIncident.title}" has been created.`,
      });

      setShowNewIncidentForm(false);
      setNewIncident({
        title: "",
        description: "",
        severity: "LOW",
      });
    } catch (error) {
      console.error("Error creating incident:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create incident. Please try again.";
      setError(errorMessage);
      toast.error("Failed to create incident", {
        description: errorMessage,
      });
    }
  };

  const handleDeleteIncident = async (id: string) => {
    try {
      await deleteIncident(id);
      setIncidents((prevIncidents) =>
        prevIncidents.filter((incident) => incident.id !== id)
      );
      toast.success("Incident deleted successfully");
    } catch (error) {
      console.error("Error deleting incident:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to delete incident. Please try again.";
      setError(errorMessage);
      toast.error("Failed to delete incident", {
        description: errorMessage,
      });
    }
  };

  return {
    incidents: sortedIncidents,
    searchQuery,
    setSearchQuery,
    sortConfig,
    setSortConfig,
    filters,
    setFilters,
    error,
    showNewIncidentForm,
    setShowNewIncidentForm,
    newIncident,
    setNewIncident,
    handleNewIncidentSubmit,
    handleDeleteIncident,
  };
}
