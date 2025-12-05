import React from "react";
import SideDrawer from "../../shared/overlay/SideDrawer";
import type { WeeklyCompanyInItem } from "./WeeklyCompaniesInTable";

type Props = {
  open: boolean;
  item: WeeklyCompanyInItem | null;
  onClose: () => void;
};

const WeeklyCompanyInDetailsDrawer: React.FC<Props> = ({
  open,
  item,
  onClose,
}) => {
  return (
    <SideDrawer open={open} onClose={onClose} title="Company IN Details">
      {!item ? (
        <div className="text-sm text-gray-500">No company selected.</div>
      ) : (
        <div className="space-y-5">
          <div className="rounded-2xl bg-gray-50 p-4">
            <div className="text-xs text-gray-500">Company</div>
            <div className="text-base font-semibold text-gray-900">
              {item.companyName}
            </div>
            <div className="mt-1 text-xs text-gray-500">
              Operator: <span className="text-gray-800">{item.operatorName}</span>
            </div>
            <div className="text-xs text-gray-500">
              Post Code: <span className="text-gray-800">{item.postCode}</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 p-4">
            <div className="text-xs text-gray-500">Period</div>
            <div className="text-sm font-medium">{item.periodLabel}</div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-50 p-3">
                <div className="text-[10px] text-gray-500">Jobs IN</div>
                <div className="text-lg font-semibold">{item.jobsIn}</div>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <div className="text-[10px] text-gray-500">Status</div>
                <div className="text-sm font-semibold text-blue-600">
                  {item.status === "active" ? "Active" : "Inactive"}
                </div>
              </div>
            </div>
          </div>

          {/* Actions placeholder */}
          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              View Jobs →
            </button>
            <button
              type="button"
              className="flex-1 rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
            >
              Export →
            </button>
          </div>
        </div>
      )}
    </SideDrawer>
  );
};

export default WeeklyCompanyInDetailsDrawer;
