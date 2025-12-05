import React from "react";
import type { JobDetails } from "../../models/jobDetails";
import AvatarCircle from "../shared/data-display/AvatarCircle";
import StatusBadge from "../shared/data-display/StatusBadge";
import { FiChevronRight } from "react-icons/fi";

interface SearchJobListItemProps {
  job: JobDetails;
  onClick: () => void;
}

const SearchJobListItem: React.FC<SearchJobListItemProps> = ({
  job,
  onClick,
}) => {
  return (
    <button
      type="button"
      className="mb-3 flex w-full items-stretch justify-between rounded-3xl bg-white px-4 py-3 text-left shadow-sm hover:bg-gray-50 last:mb-0"
      onClick={onClick}
    >
      {/* Left avatar + main info */}
      <div className="flex flex-1 items-start gap-3">
        <AvatarCircle name={job.companyName} size="md" />

        <div className="flex flex-col">
          <div className="text-sm font-semibold text-gray-900">
            {job.postcode}
          </div>
          <div className="mt-0.5 text-xs text-gray-500">
            {job.completedAt}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-x-10 gap-y-1 text-[11px] text-gray-500">
            <div>
              <span>Completed by</span>
              <div className="font-semibold text-gray-800">
                {job.completedBy}
              </div>
            </div>
            <div>
              <span>Invoice no.</span>
              <div className="font-semibold text-gray-800">
                {job.invoiceNo}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right status + arrow */}
      <div className="ml-3 flex items-center gap-3">
        <div className="flex flex-col items-end text-xs">
          <span className="mb-1 text-[11px] text-gray-500">Status</span>
          <StatusBadge variant="completed">Completed</StatusBadge>
        </div>
        <FiChevronRight className="h-4 w-4 text-gray-400" />
      </div>
    </button>
  );
};

export default SearchJobListItem;
