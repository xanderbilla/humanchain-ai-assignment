export interface Incident {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly severity: "LOW" | "MEDIUM" | "HIGH";
  readonly reportedAt: string;
}

export interface ApiResponse<T> {
  readonly success: boolean;
  readonly message: string;
  readonly data: T;
  readonly timestamp: string;
  readonly status: string;
}
