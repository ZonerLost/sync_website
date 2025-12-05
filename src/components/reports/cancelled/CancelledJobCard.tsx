import React from "react";

export interface CancelledJob {
  id: string;
  title: string;          // EN1 2RR
  phone: string;
  reason: string;
  address: string;
  cancelledLabel: string; // "Cancelled on Nov 03, 2025 | 12:00 PM"
  instructions: string;
}

interface CancelledJobCardProps {
  job: CancelledJob;
}

const CancelledJobCard: React.FC<CancelledJobCardProps> = ({ job }) => {
  return (
    <div className="rounded-3xl bg-white px-4 py-3 text-xs shadow-sm">
      <div className="text-sm font-semibold text-gray-900">
        {job.title}
      </div>

      <div className="mt-1 text-[11px] text-gray-500">
        {job.phone} | Reason: {job.reason}
      </div>

      <div className="mt-3 text-[11px] text-gray-500">Address</div>
      <div className="text-xs text-gray-900">{job.address}</div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="text-[11px] text-gray-500">Instructions</div>
        <div className="rounded-full bg-[#FFE6EA] px-3 py-1 text-[11px] font-semibold text-[#D7263D]">
          {job.cancelledLabel}
        </div>
      </div>

      <div className="mt-1 text-xs text-gray-900">{job.instructions}</div>
    </div>
  );
};

export default CancelledJobCard;
