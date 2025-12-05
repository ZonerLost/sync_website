import React from "react";
import type { Company } from "../../../hooks/management/useCompanies";

type Props = {
  company: Company;
  onEdit: (c: Company) => void;
  onDelete: (c: Company) => void;
};

const CompanyRowCard: React.FC<Props> = ({ company, onEdit, onDelete }) => {
  return (
    <div className="rounded-2xl bg-white border border-gray-100">
      <div className="flex items-start justify-between gap-3 px-4 py-4">
        {/* Left block */}
        <div className="min-w-0">
          <div className="text-sm font-semibold text-gray-900 truncate">
            {company.name}
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] text-gray-500">Commission</div>
              <div className="text-xs font-medium text-gray-900">
                {company.commissionPercent}%
              </div>
            </div>

            <div>
              <div className="text-[10px] text-gray-500">Status</div>
              <div className="text-xs font-medium text-blue-600">
                • {company.status === "active" ? "Active" : "Inactive"}
              </div>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(company)}
            className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100"
            title="Edit"
          >
            ✎
          </button>
          <button
            type="button"
            onClick={() => onDelete(company)}
            className="h-8 w-8 rounded-full bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100"
            title="Delete"
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyRowCard;
