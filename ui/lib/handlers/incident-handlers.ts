import { Incident } from "@/types/incident";
import { createIncident, deleteIncident } from "../api";

export const handleSubmit = async (
  e: React.FormEvent,
  newIncident: Partial<Incident>,
  incidents: Incident[],
  setIncidents: (incidents: Incident[]) => void,
  setShowNewIncidentForm: (show: boolean) => void,
  setNewIncident: (incident: Partial<Incident>) => void,
  setError: (error: string | null) => void
) => {
  e.preventDefault();
  try {
    const data = await createIncident(newIncident);
    setIncidents([...incidents, data]);
    setShowNewIncidentForm(false);
    setNewIncident({ title: "", description: "", severity: "LOW" });
    setError(null);
  } catch (error) {
    console.error("Error creating incident:", error);
    setError(
      error instanceof Error ? error.message : "Failed to create incident"
    );
  }
};

export const handleDelete = async (
  id: string,
  incidents: Incident[],
  setIncidents: React.Dispatch<React.SetStateAction<Incident[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await deleteIncident(id);
    setIncidents((prevIncidents) =>
      prevIncidents.filter((incident) => incident.id !== id)
    );
    setError(null);
  } catch (error) {
    console.error("Error deleting incident:", error);
    setError(
      error instanceof Error ? error.message : "Failed to delete incident"
    );
    throw error;
  }
};

export const handleSort = (
  key: keyof Incident,
  sortConfig: { key: keyof Incident; direction: "asc" | "desc" } | null,
  setSortConfig: React.Dispatch<
    React.SetStateAction<{
      key: keyof Incident;
      direction: "asc" | "desc";
    } | null>
  >
) => {
  let direction: "asc" | "desc" = "asc";
  if (sortConfig && sortConfig.key === key) {
    direction = sortConfig.direction === "asc" ? "desc" : "asc";
  }
  setSortConfig({ key, direction });
};

// This function should be used within a component that has access to the router
export const handleViewIncident = (incident: Incident) => {
  // This function should be used within a component that has access to the router
  // The component should pass the router to this function or implement the navigation directly
  console.log("Viewing incident:", incident.id);
  // The actual navigation should be handled by the component using this function
};
