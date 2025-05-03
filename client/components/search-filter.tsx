"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, Filter, Calendar, Plus } from "lucide-react";

interface SearchFilterProps {
  readonly searchQuery: string;
  readonly onSearchChange: (value: string) => void;
  readonly severity: string;
  readonly onSeverityChange: (value: string) => void;
  readonly startDate: string;
  readonly onStartDateChange: (value: string) => void;
  readonly endDate: string;
  readonly onEndDateChange: (value: string) => void;
  readonly onCreateNew: () => void;
  readonly showCreateButton?: boolean;
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  severity,
  onSeverityChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onCreateNew,
  showCreateButton = true,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex gap-4">
        <div className="flex-1 max-w-md relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-9"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                onClick={() => onSearchChange("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        {showCreateButton && (
          <Button onClick={onCreateNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Incident
          </Button>
        )}
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        <Select value={severity} onValueChange={onSeverityChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-[150px]"
          />
          <span>to</span>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-[150px]"
          />
        </div>
      </div>
    </div>
  );
}
