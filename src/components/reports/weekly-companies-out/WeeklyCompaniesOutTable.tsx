import React from "react";

export type WeeklyCompanyOutItem = {
  id: string;
  companyName: string;
  operatorName: string;
  postCode: string;
  jobsOut: number;
  periodLabel: string;
  status: "active" | "inactive";
};

type Props = {
  items: WeeklyCompanyOutItem[];
  onOpenDetails: (item: WeeklyCompanyOutItem) => void;
};

const WeeklyCompaniesOutTable: React.FC<Props> = ({ items, onOpenDetails }) => {
  if (!items.length) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500">
        No results found for this filter.
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="text-xs text-gray-500">
          {items.length} companies found
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-[820px] w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-[11px] text-gray-500">
              <th className="px-5 py-3">Company</th>
              <th className="px-5 py-3">Operator</th>
              <th className="px-5 py-3">Post Code</th>
              <th className="px-5 py-3">Jobs OUT</th>
              <th className="px-5 py-3">Period</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr
                key={it.id}
                className="border-b last:border-b-0 border-gray-100"
              >
                <td className="px-5 py-4">
                  <div className="font-medium text-gray-900">
                    {it.companyName}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Status •{" "}
                    <span className="text-blue-600">
                      {it.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">{it.operatorName}</td>
                <td className="px-5 py-4">{it.postCode}</td>
                <td className="px-5 py-4">{it.jobsOut}</td>
                <td className="px-5 py-4">{it.periodLabel}</td>
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => onOpenDetails(it)}
                    className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-800 hover:bg-gray-200"
                  >
                    View Details →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden p-4 space-y-3">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            onClick={() => onOpenDetails(it)}
            className="w-full text-left rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {it.companyName}
                </div>
                <div className="mt-1 text-[11px] text-gray-500">
                  {it.operatorName} • {it.postCode}
                </div>
              </div>
              <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-700">
                {it.jobsOut} jobs
              </span>
            </div>
            <div className="mt-3 text-[11px] text-gray-500">
              {it.periodLabel}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCompaniesOutTable;
