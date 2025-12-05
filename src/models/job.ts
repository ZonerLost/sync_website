export type JobStatus =
  | "open"
  | "completed"
  | "onHold"
  | "appointments"
  | "cancelled";

export interface Job {
  id: string;
  status: JobStatus;
  postcode: string;       // EN1 2RR, RM15 4YE
  zoneCode: string;       // Z1Z1
  operatorName: string;   // COSMIN Operator, Z1Z1 etc.
  scheduledAt: string;    // "Nov 23, 2025 | 12:00 PM"
  price?: number;         // for completed jobs
  instructions?: string;  // open / onHold / appointments / cancelled
  addedBy?: string;       // for onHold
  onHoldBy?: string;      // for onHold
}

export interface JobStatusConfig {
  id: JobStatus;
  label: string;        // for pill labels
  panelTitle: string;   // "Open Jobs", "Completed Jobs", ...
}

export const JOB_STATUS_CONFIG: Record<JobStatus, JobStatusConfig> = {
  open: {
    id: "open",
    label: "Open",
    panelTitle: "Open Jobs",
  },
  completed: {
    id: "completed",
    label: "Completed",
    panelTitle: "Completed Jobs",
  },
  onHold: {
    id: "onHold",
    label: "On Hold",
    panelTitle: "On Hold",
  },
  appointments: {
    id: "appointments",
    label: "Appointments",
    panelTitle: "Appointments",
  },
  cancelled: {
    id: "cancelled",
    label: "Cancelled",
    panelTitle: "Cancelled Jobs",
  },
};
