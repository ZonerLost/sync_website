import React from "react";
import { cn } from "../../../utils/cn";

interface StatCardProps {
  label: string;
  value: string | number;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-2xl bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-gray-100",
        className
      )}
    >
      <span className="text-[11px] font-medium text-gray-500">
        {label}
      </span>
      <span className="mt-1 text-base font-semibold text-gray-900">
        {value}
      </span>
    </div>
  );
};

export default StatCard;
