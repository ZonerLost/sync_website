import React from "react";
import PillFilterGroup, {
  type PillOption,
} from "../shared/inputs/PillFilterGroup";
import { type JobStatus, JOB_STATUS_CONFIG } from "../../models/job";

export interface JobCounts {
  open: number;
  completed: number;
  onHold: number;
  appointments: number;
  cancelled: number;
}

interface JobFiltersBarProps {
  activeStatus: JobStatus;
  counts: JobCounts;
  onChange: (status: JobStatus) => void;
}

const JobFiltersBar: React.FC<JobFiltersBarProps> = ({
  activeStatus,
  counts,
  onChange,
}) => {
  const options: PillOption[] = [
    {
      id: "open",
      label: JOB_STATUS_CONFIG.open.label,
      count: counts.open,
      variant: "open",
    },
    {
      id: "completed",
      label: JOB_STATUS_CONFIG.completed.label,
      count: counts.completed,
      variant: "completed",
    },
    {
      id: "onHold",
      label: JOB_STATUS_CONFIG.onHold.label,
      count: counts.onHold,
      variant: "onHold",
    },
    {
      id: "appointments",
      label: JOB_STATUS_CONFIG.appointments.label,
      count: counts.appointments,
      variant: "appointments",
    },
    {
      id: "cancelled",
      label: JOB_STATUS_CONFIG.cancelled.label,
      count: counts.cancelled,
      variant: "cancelled",
    },
  ];

  return (
    <div className="flex justify-center md:justify-start">
      <div className="rounded-full bg-white/95 px-3 py-2 shadow-sm">
        <PillFilterGroup
          options={options}
          value={activeStatus}
          onChange={(id) => onChange(id as JobStatus)}
        />
      </div>
    </div>
  );
};

export default JobFiltersBar;
