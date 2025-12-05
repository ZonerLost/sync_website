import React from "react";
import type { Company } from "../../models/company";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { cn } from "../../utils/cn";

interface CompanyListItemProps {
  company: Company;
  onEdit: () => void;
  onDelete: () => void;
}

const CompanyListItem: React.FC<CompanyListItemProps> = ({
  company,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex flex-col gap-3 rounded-3xl bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100 last:mb-0 sm:flex-row sm:items-stretch sm:justify-between">
      <div className="flex flex-1 flex-col gap-2">
        <span className="text-sm font-semibold text-gray-900">{company.name}</span>
        <div className="text-[11px] text-gray-500">
          <div>Commission</div>
          <div className="mt-0.5 text-sm font-semibold text-gray-900">
            {company.commission}%
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-xs sm:items-end sm:text-right">
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <button
            type="button"
            onClick={onEdit}
            className={cn(
              "flex h-9 min-w-[44px] items-center justify-center rounded-full bg-blue-50 text-blue-500",
              "hover:bg-blue-100"
            )}
          >
            <FiEdit2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className={cn(
              "flex h-9 min-w-[44px] items-center justify-center rounded-full bg-rose-50 text-rose-500",
              "hover:bg-rose-100"
            )}
          >
            <FiTrash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="text-[11px] text-gray-500">
          <div>Status</div>
          <div className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-blue-600 sm:justify-end">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span>Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyListItem;
