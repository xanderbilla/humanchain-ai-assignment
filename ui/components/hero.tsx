import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Server,
  FileText,
} from "lucide-react";
import { checkServerHealth } from "@/lib/api";
import Image from "next/image";

export function Hero() {
  const router = useRouter();
  const [isServerOnline, setIsServerOnline] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      setIsChecking(true);
      const isHealthy = await checkServerHealth();
      setIsServerOnline(isHealthy);
      setIsChecking(false);
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleViewIncidents = () => {
    router.push("/incidents");
  };

  const renderHealthStatus = () => {
    const baseClasses =
      "flex items-center gap-3 px-4 py-2 rounded-lg border transition-all duration-300 h-12";

    if (isChecking) {
      return (
        <div className={`${baseClasses} bg-yellow-50 border-yellow-200`}>
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-yellow-600" />
            <Server className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-yellow-800">
              Checking Server
            </span>
            <span className="text-xs text-yellow-600">Please wait...</span>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`${baseClasses} ${
          isServerOnline
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        }`}
      >
        <div className="flex items-center gap-2">
          {isServerOnline ? (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600" />
          )}
          <Server
            className={`h-5 w-5 ${
              isServerOnline ? "text-green-600" : "text-red-600"
            }`}
          />
        </div>
        <div className="flex flex-col">
          <span
            className={`text-sm font-medium ${
              isServerOnline ? "text-green-800" : "text-red-800"
            }`}
          >
            {isServerOnline ? "Server Online" : "Server Offline"}
          </span>
          <span
            className={`text-xs ${
              isServerOnline ? "text-green-600" : "text-red-600"
            }`}
          >
            {isServerOnline ? "All systems operational" : "Connection failed"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-[calc(100vh-8rem)] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070"
          alt="AI Technology Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>
      <div className="mx-auto max-w-7xl h-full relative z-10">
        <div className="relative z-10 h-full flex items-center lg:w-full lg:max-w-2xl">
          <div className="relative px-6 lg:px-8 lg:pr-0">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                AI Safety Incident Log
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Track, analyze, and manage AI safety incidents in real-time. Our
                platform helps you maintain transparency and accountability in
                AI development.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button
                  size="lg"
                  onClick={handleViewIncidents}
                  className="h-12 px-6"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  View Incidents
                </Button>
                {renderHealthStatus()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
