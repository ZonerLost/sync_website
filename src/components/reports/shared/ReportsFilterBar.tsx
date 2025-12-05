import React from "react";
import { FiCalendar, FiChevronDown } from "react-icons/fi";
import { cn } from "../../../utils/cn";

export interface ReportsFilterBarProps {
  dateLabel: string;
  entityLabel: string;
  entityOptions: string[];
  onEntityChange?: (value: string) => void;
  onDateClick?: () => void;
  onShowReport?: () => void;
}

const ReportsFilterBar: React.FC<ReportsFilterBarProps> = ({
  dateLabel,
  entityLabel,
  entityOptions,
  onEntityChange,
  onDateClick,
  onShowReport,
}) => {
  return (
    <div className="mb-4 grid gap-3 md:grid-cols-[1.1fr_1.1fr_auto] md:items-center">
      {/* date pill */}
      <button
        type="button"
        onClick={onDateClick}
        className={cn(
          "flex w-full items-center justify-between rounded-3xl bg-[#f5f5f6] px-5 py-3 text-left text-sm",
          "text-gray-900 hover:bg-[#ececee]"
        )}
      >
        <span className="truncate">{dateLabel}</span>
        <FiCalendar className="ml-3 h-4 w-4 shrink-0 text-gray-500" />
      </button>

      {/* entity dropdown pill */}
      <div className="flex w-full items-center rounded-3xl bg-[#f5f5f6] px-5 py-3 text-sm text-gray-900">
        <select
          className="w-full min-w-0 bg-transparent text-sm outline-none"
          value={entityLabel}
          onChange={(e) => onEntityChange?.(e.target.value)}
        >
          {entityOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <FiChevronDown className="ml-2 h-4 w-4 shrink-0 text-gray-500" />
      </div>

      {/* show report */}
      <button
        type="button"
        onClick={onShowReport}
        className={cn(
          "h-12 w-full rounded-3xl bg-black px-6 text-sm font-semibold text-white",
          "hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black/40 md:w-auto"
        )}
      >
        Show report
      </button>
    </div>
  );
};

export default ReportsFilterBar;
