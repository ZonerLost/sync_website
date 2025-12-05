import React from "react";
import { cn } from "../../../utils/cn";

export interface OperatorSummary {
  id: string;
  name: string;
  completedJobs: number;
  cancelledJobs: number;
}

interface OperatorCardProps {
  operator: OperatorSummary;
  onViewJobs: () => void;
}

const OperatorCard: React.FC<OperatorCardProps> = ({
  operator,
  onViewJobs,
}) => {
  return (
    <div className="flex flex-col gap-3 rounded-3xl bg-white px-4 py-3 text-xs shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="text-sm font-semibold text-gray-900">
          {operator.name}
        </div>
        <div className="mt-1 text-[11px] text-gray-500">
          {operator.completedJobs} Completed | {operator.cancelledJobs} Cancelled
        </div>
      </div>

      <button
        type="button"
        onClick={onViewJobs}
        className={cn(
          "w-full rounded-3xl bg-[#0F5CCF] px-5 py-2 text-center text-xs font-semibold text-white",
          "sm:w-auto",
          "hover:bg-[#0d4fb3] focus:outline-none focus:ring-2 focus:ring-blue-200"
        )}
      >
        View Jobs
      </button>
    </div>
  );
};

export default OperatorCard;
