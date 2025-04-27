"use client";

import { useIncidents } from "@/hooks/use-incidents";
import { NewIncidentForm } from "@/components/new-incident-form";
import { SearchFilter } from "@/components/search-filter";
import { IncidentList } from "@/components/incident-list";
import { handleSort } from "@/lib/handlers/incident-handlers";

export default function IncidentsPage() {
  const {
    incidents,
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
  } = useIncidents();

  return (
    <div className="container mx-auto py-8 min-h-[calc(100vh-10rem)]">
      {error && (
        <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-md">
          {error}
        </div>
      )}

      {showNewIncidentForm && (
        <NewIncidentForm
          onSubmit={handleNewIncidentSubmit}
          onCancel={() => setShowNewIncidentForm(false)}
          title={newIncident.title}
          onTitleChange={(value) =>
            setNewIncident({ ...newIncident, title: value })
          }
          description={newIncident.description}
          onDescriptionChange={(value) =>
            setNewIncident({ ...newIncident, description: value })
          }
          severity={newIncident.severity}
          onSeverityChange={(value) =>
            setNewIncident({ ...newIncident, severity: value })
          }
        />
      )}

      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        severity={filters.severity}
        onSeverityChange={(value) =>
          setFilters({ ...filters, severity: value })
        }
        startDate={filters.startDate}
        onStartDateChange={(value) =>
          setFilters({ ...filters, startDate: value })
        }
        endDate={filters.endDate}
        onEndDateChange={(value) => setFilters({ ...filters, endDate: value })}
        onCreateNew={() => setShowNewIncidentForm(true)}
        showCreateButton={!showNewIncidentForm}
      />

      <IncidentList
        incidents={incidents}
        onDelete={handleDeleteIncident}
        sortConfig={sortConfig}
        onSort={(key) => handleSort(key, sortConfig, setSortConfig)}
        searchQuery={searchQuery}
        filters={filters}
      />
    </div>
  );
}
