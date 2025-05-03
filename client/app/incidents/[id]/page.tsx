"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import {
  HeaderSkeleton,
  DescriptionSkeleton,
  MetadataSkeleton,
  ActionsSkeleton,
} from "./components/skeletons";

// Dynamic imports for components
const IncidentHeader = dynamic(() => import("./components/incident-header"), {
  loading: () => <HeaderSkeleton />,
});

const IncidentDescription = dynamic(
  () => import("./components/incident-description"),
  {
    loading: () => <DescriptionSkeleton />,
  }
);

const IncidentMetadata = dynamic(
  () => import("./components/incident-metadata"),
  {
    loading: () => <MetadataSkeleton />,
  }
);

const IncidentActions = dynamic(() => import("./components/incident-actions"), {
  loading: () => <ActionsSkeleton />,
});

export default function IncidentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    router.push("/incidents");
  };

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-10rem)]">
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Incidents
          </Button>
        </div>

        <div className="grid gap-6">
          <Suspense fallback={<HeaderSkeleton />}>
            <IncidentHeader
              incidentId={params.id as string}
              onError={setError}
            />
          </Suspense>

          <div className="grid gap-6 md:grid-cols-2">
            <Suspense fallback={<DescriptionSkeleton />}>
              <IncidentDescription
                incidentId={params.id as string}
                onError={setError}
              />
            </Suspense>

            <Suspense fallback={<MetadataSkeleton />}>
              <IncidentMetadata
                incidentId={params.id as string}
                onError={setError}
              />
            </Suspense>
          </div>

          <Suspense fallback={<ActionsSkeleton />}>
            <IncidentActions
              incidentId={params.id as string}
              onError={setError}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
