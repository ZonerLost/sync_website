import React from "react";
import type { Job, JobStatus } from "../../models/job";
import StatusBadge from "../shared/data-display/StatusBadge";
import AvatarCircle from "../shared/data-display/AvatarCircle";
import { cn } from "../../utils/cn";

interface JobListItemProps {
  job: Job;
  onCancelClick?: (job: Job) => void; // only used for onHold
}

const JobListItem: React.FC<JobListItemProps> = ({ job, onCancelClick }) => {
  return (
    <div className="mb-3 rounded-2xl bg-white px-4 py-3 text-sm shadow-sm last:mb-0">
      {renderByStatus(job.status, job, onCancelClick)}
    </div>
  );
};

export default JobListItem;

// ----------------- render helpers -----------------

function renderByStatus(
  status: JobStatus,
  job: Job,
  onCancelClick?: (job: Job) => void
) {
  switch (status) {
    case "open":
      return <OpenJobCard job={job} />;
    case "completed":
      return <CompletedJobCard job={job} />;
    case "onHold":
      return <OnHoldJobCard job={job} onCancelClick={onCancelClick} />;
    case "appointments":
      return <AppointmentJobCard job={job} />;
    case "cancelled":
      return <CancelledJobCard job={job} />;
    default:
      return null;
  }
}

const chipBase =
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold";

const OpenJobCard: React.FC<{ job: Job }> = ({ job }) => (
  <>
    <div className="mb-2 flex items-center justify-between gap-2">
      <span className={cn(chipBase, "bg-blue-50 text-blue-700")}>
        {job.zoneCode}
      </span>
      <StatusBadge variant="completed">Accepted</StatusBadge>
    </div>

    <div className="text-sm font-semibold text-gray-900">
      {job.postcode}
    </div>
    <div className="mt-1 text-xs text-gray-500">
      {job.operatorName} | {job.scheduledAt}
    </div>

    {job.instructions && (
      <>
        <div className="mt-2 text-[11px] font-semibold text-gray-500">
          Instructions
        </div>
        <div className="mt-0.5 text-xs text-gray-600">
          {job.instructions}
        </div>
      </>
    )}
  </>
);

const CompletedJobCard: React.FC<{ job: Job }> = ({ job }) => (
  <div className="flex items-start gap-3">
    <AvatarCircle name={job.zoneCode || job.postcode} size="md" />

    <div className="flex flex-1 flex-col">
      <div className="text-sm font-semibold text-gray-900">
        {job.postcode}
      </div>
      <div className="mt-0.5 text-xs text-gray-500">{job.scheduledAt}</div>

      <div className="mt-2 text-[11px] text-gray-500">
        Completed by{" "}
        <span className="font-semibold text-gray-700">
          {job.operatorName}
        </span>
      </div>
    </div>

    <div className="flex flex-col items-end gap-1 text-xs">
      <StatusBadge variant="completed">Completed</StatusBadge>
      {typeof job.price === "number" && (
        <>
          <span className="text-[11px] text-gray-500">Price</span>
          <span className="text-sm font-semibold text-blue-700">
            £{job.price.toFixed(2)}
          </span>
        </>
      )}
    </div>
  </div>
);

const OnHoldJobCard: React.FC<{
  job: Job;
  onCancelClick?: (job: Job) => void;
}> = ({ job, onCancelClick }) => (
  <>
    <span className={cn(chipBase, "bg-blue-50 text-blue-700")}>
      On Hold Waiting for Payment
    </span>

    <div className="mt-2 text-sm font-semibold text-gray-900">
      {job.postcode}
    </div>

    <div className="mt-1 space-y-1 text-[11px] text-gray-500">
      {job.addedBy && (
        <div>
          Added by{" "}
          <span className="font-semibold text-gray-700">
            {job.addedBy}
          </span>{" "}
          | {job.scheduledAt}
        </div>
      )}
      {job.onHoldBy && (
        <div>
          On hold by{" "}
          <span className="font-semibold text-gray-700">
            {job.onHoldBy}
          </span>{" "}
          | {job.scheduledAt}
        </div>
      )}
    </div>

    <button
      type="button"
      className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-100"
      onClick={() => onCancelClick && onCancelClick(job)}
    >
      Cancel Job
    </button>
  </>
);

const AppointmentJobCard: React.FC<{ job: Job }> = ({ job }) => (
  <>
    <span className={cn(chipBase, "bg-sky-50 text-sky-700")}>
      Appointment
    </span>
    <div className="mt-2 text-sm font-semibold text-gray-900">
      {job.postcode}
    </div>
    <div className="mt-1 text-xs text-gray-500">
      {job.operatorName} | {job.scheduledAt}
    </div>
    {job.instructions && (
      <div className="mt-1 text-xs text-gray-500">
        {job.instructions}
      </div>
    )}
  </>
);

const CancelledJobCard: React.FC<{ job: Job }> = ({ job }) => (
  <>
    <span className={cn(chipBase, "bg-rose-50 text-rose-700")}>
      Cancelled
    </span>
    <div className="mt-2 text-sm font-semibold text-gray-900">
      {job.postcode}
    </div>
    <div className="mt-1 text-xs text-gray-500">
      {job.operatorName} | {job.scheduledAt}
    </div>
    {job.instructions && (
      <div className="mt-1 text-xs text-gray-500">
        {job.instructions}
      </div>
    )}
  </>
);
