"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIncidents } from "@/hooks/use-incidents";
import { handleSort } from "@/lib/handlers/incident-handlers";

// Dynamically import components with loading states
const NewIncidentForm = dynamic(
  () =>
    import("@/components/new-incident-form").then((mod) => mod.NewIncidentForm),
  {
    loading: () => (
      <div className="space-y-4 p-4 border rounded-lg">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-1/4" />
      </div>
    ),
  }
);

const SearchFilter = dynamic(
  () => import("@/components/search-filter").then((mod) => mod.SearchFilter),
  {
    loading: () => (
      <div className="space-y-4 mb-6">
        <Skeleton className="h-10 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-10 w-1/4" />
        </div>
      </div>
    ),
  }
);

const IncidentList = dynamic(
  () => import("@/components/incident-list").then((mod) => mod.IncidentList),
  {
    loading: () => (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    ),
  }
);

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

      <Suspense
        fallback={
          <div className="space-y-4 p-4 border rounded-lg">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-1/4" />
          </div>
        }
      >
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
      </Suspense>

      <Suspense
        fallback={
          <div className="space-y-4 mb-6">
            <Skeleton className="h-10 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-1/4" />
              <Skeleton className="h-10 w-1/4" />
            </div>
          </div>
        }
      >
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
          onEndDateChange={(value) =>
            setFilters({ ...filters, endDate: value })
          }
          onCreateNew={() => setShowNewIncidentForm(true)}
          showCreateButton={!showNewIncidentForm}
        />
      </Suspense>

      <Suspense
        fallback={
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        }
      >
        <IncidentList
          incidents={incidents}
          onDelete={handleDeleteIncident}
          sortConfig={sortConfig}
          onSort={(key) => handleSort(key, sortConfig, setSortConfig)}
          searchQuery={searchQuery}
          filters={filters}
        />
      </Suspense>
    </div>
  );
}
