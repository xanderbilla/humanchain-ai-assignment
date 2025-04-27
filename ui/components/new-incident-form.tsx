"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";

interface NewIncidentFormProps {
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly onCancel: () => void;
  readonly title: string;
  readonly onTitleChange: (value: string) => void;
  readonly description: string;
  readonly onDescriptionChange: (value: string) => void;
  readonly severity: "LOW" | "MEDIUM" | "HIGH";
  readonly onSeverityChange: (value: "LOW" | "MEDIUM" | "HIGH") => void;
}

export function NewIncidentForm({
  onSubmit,
  onCancel,
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  severity,
  onSeverityChange,
}: NewIncidentFormProps) {
  const getSeverityIcon = (value: string) => {
    switch (value) {
      case "LOW":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "MEDIUM":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "HIGH":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <h2 className="text-2xl font-bold">New Incident</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-muted-foreground"
              >
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="severity"
                className="block text-sm font-medium text-muted-foreground"
              >
                Severity
              </label>
              <Select value={severity} onValueChange={onSeverityChange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select severity">
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(severity)}
                      <span>{severity}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-blue-500" />
                      <span>Low</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="MEDIUM">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span>Medium</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="HIGH">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span>High</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-muted-foreground"
            >
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              required
              className="min-h-[150px]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Create Incident</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
