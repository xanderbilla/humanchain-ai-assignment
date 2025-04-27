import { SearchFilterSkeleton } from "./search-filter-skeleton";
import { IncidentListSkeleton } from "./incident-list-skeleton";

export function IncidentsPageSkeleton() {
  return (
    <div className="container mx-auto py-8 min-h-[calc(100vh-10rem)]">
      <SearchFilterSkeleton />
      <IncidentListSkeleton />
    </div>
  );
}
