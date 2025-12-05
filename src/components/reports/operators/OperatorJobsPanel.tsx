import React from "react";
import { FiCalendar, FiChevronRight } from "react-icons/fi";
import { cn } from "../../../utils/cn";

export interface OperatorJob {
  id: string;
  postcode: string;   // RM15 4YE
  operatorName: string;
  companyJob: string; // R Locksmith
  status: string;     // Completed
  price: string;      // £2000.00
  dateTime: string;   // Oct 23, 2025 | 12:00 PM
}

interface OperatorJobsPanelProps {
  operatorName: string;
  dateLabel: string;
  jobs: OperatorJob[];
  onClose: () => void;
}

const OperatorJobsPanel: React.FC<OperatorJobsPanelProps> = ({
  operatorName,
  dateLabel,
  jobs,
  onClose,
}) => {
  return (
    <div className="flex h-full flex-col rounded-3xl bg-white px-4 pb-4 pt-3 shadow-md">
      {/* header */}
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <span className="text-sm">×</span>
        </button>
        <h2 className="flex-1 text-center text-sm font-semibold text-gray-900">
          View Jobs
        </h2>
        <div className="h-8 w-8" />
      </div>

      {/* date pill inside modal */}
      <button
        type="button"
        className={cn(
          "mb-3 flex items-center justify-between rounded-3xl bg-[#f5f5f6] px-4 py-2 text-xs text-gray-900"
        )}
      >
        <span>{dateLabel}</span>
        <FiCalendar className="h-4 w-4 text-gray-500" />
      </button>

      <div className="flex-1 overflow-y-auto pb-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="mb-3 rounded-3xl bg-[#f5f5f6] px-4 py-3 text-xs text-gray-900 last:mb-0"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E4F0FF] text-xs font-semibold text-[#0F5CCF]">
                  {job.postcode[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {job.postcode}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {operatorName}
                  </div>
                </div>
              </div>

              <FiChevronRight className="h-4 w-4 text-gray-400" />
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 text-[11px] text-gray-500 sm:grid-cols-3 sm:gap-2">
              <div>
                <div className="text-[11px] text-gray-500">
                  Company Job
                </div>
                <div className="text-xs text-gray-900">
                  {job.companyJob}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-gray-500">Status</div>
                <div className="text-xs text-[#0F5CCF]">{job.status}</div>
              </div>
              <div>
                <div className="text-[11px] text-gray-500">Price</div>
                <div className="text-xs text-gray-900">{job.price}</div>
              </div>
            </div>

            <div className="mt-2 text-[11px] text-gray-500">
              {job.dateTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperatorJobsPanel;
