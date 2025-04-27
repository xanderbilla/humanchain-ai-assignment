import { Incident, ApiResponse } from "@/types/incident";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

export async function fetchIncidents(): Promise<Incident[]> {
  const response = await fetch(`${API_BASE_URL}/incidents`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: ApiResponse<Incident[]> = await response.json();
  if (data.success && Array.isArray(data.data)) {
    return data.data;
  }
  throw new Error("Invalid data format received from server");
}

export async function createIncident(
  incident: Partial<Incident>
): Promise<Incident> {
  const response = await fetch(`${API_BASE_URL}/incidents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(incident),
  });

  if (!response.ok) {
    throw new Error("Failed to create incident");
  }

  const data: ApiResponse<Incident> = await response.json();
  if (data.success && data.data) {
    return data.data;
  }
  throw new Error("Invalid response format");
}

export async function deleteIncident(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/incidents/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete incident");
  }

  const data: ApiResponse<null> = await response.json();
  if (!data.success) {
    throw new Error("Failed to delete incident");
  }
}

export async function fetchIncident(id: string): Promise<Incident> {
  const response = await fetch(`${API_BASE_URL}/incidents/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: ApiResponse<Incident> = await response.json();
  if (data.success && data.data) {
    return data.data;
  }
  throw new Error("Invalid data format received from server");
}

export async function checkServerHealth(): Promise<boolean> {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.ok;
}
