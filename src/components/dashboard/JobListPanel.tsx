import React from "react";
import { type Job, type JobStatus, JOB_STATUS_CONFIG } from "../../models/job";
import Card from "../shared/data-display/Card";
import SearchField from "../shared/inputs/SearchField";
import JobListItem from "./JobListItem";
import { FiX } from "react-icons/fi";
import { cn } from "../../utils/cn";

interface JobListPanelProps {
  status: JobStatus;
  jobs: Job[];
  onClose?: () => void;
  showHeaderClose?: boolean;
  className?: string;
  onCancelJobClick?: (job: Job) => void; // bubble up cancel button
}

const JobListPanel: React.FC<JobListPanelProps> = ({
  status,
  jobs,
  onClose,
  showHeaderClose,
  className,
  onCancelJobClick,
}) => {
  const [query, setQuery] = React.useState("");

  const filteredJobs = React.useMemo(() => {
    if (!query.trim()) return jobs;
    const q = query.toLowerCase();
    return jobs.filter(
      (job) =>
        job.postcode.toLowerCase().includes(q) ||
        job.operatorName.toLowerCase().includes(q) ||
        job.zoneCode.toLowerCase().includes(q)
    );
  }, [jobs, query]);

  const title = JOB_STATUS_CONFIG[status].panelTitle;

  return (
    // <Card
    //   className={cn(
    //     "flex h-full flex-col rounded-3xl bg-white shadow-md",
    //     className
    //   )}
    // >
     <Card
      className={cn(
        "relative z-30 flex h-full flex-col rounded-3xl bg-white shadow-md",
        className
      )}
    >
      {/* header */}
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
        {showHeaderClose && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm hover:bg-gray-50"
          >
            <FiX className="h-4 w-4" />
          </button>
        )}
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </div>

      {/* search */}
      <div className="border-b border-gray-100 px-4 py-3">
        <SearchField
          placeholder="Search here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* list */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {filteredJobs.map((job) => (
          <JobListItem
            key={job.id}
            job={job}
            onCancelClick={onCancelJobClick}
          />
        ))}

        {filteredJobs.length === 0 && (
          <div className="py-6 text-center text-xs text-gray-400">
            No jobs found for this filter.
          </div>
        )}
      </div>
    </Card>
  );
};

export default JobListPanel;
