import React from "react";
import { cn } from "../../utils/cn";

export interface PaymentProfileRow {
  id: string;
  locksmithName: string;
  initials: string;
  salaryProfile: string;
  jobs: number;
  workCost: string;
  techPay: string;
}

interface PaymentProfileTableProps {
  title: string;           // e.g. "PAYMENT PROFILE : 50% | Jobs: 1"
  rows: PaymentProfileRow[];
  totalCompanyPay: string; // "£0.00"
  platformProfit: string;  // "£0.00"
}

const PaymentProfileTable: React.FC<PaymentProfileTableProps> = ({
  title,
  rows,
  totalCompanyPay,
  platformProfit,
}) => {
  return (
    <div className="mt-5 rounded-3xl bg-white px-4 py-3 shadow-sm">
      <div className="text-xs font-semibold text-gray-800">{title}</div>

      {/* mobile-friendly cards */}
      <div className="mt-3 space-y-3 md:hidden">
        {rows.map((row, idx) => (
          <div
            key={row.id}
            className="rounded-2xl border border-gray-100 px-3 py-3 text-xs text-gray-800 shadow-[0_1px_4px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center justify-between gap-2 text-[11px] text-gray-500">
              <span className="font-semibold text-gray-900">
                #{idx + 1} {row.locksmithName}
              </span>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                {row.salaryProfile}
              </span>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-gray-500">
              <div>
                <div className="text-gray-500">Initials</div>
                <div className="text-xs text-gray-900">{row.initials}</div>
              </div>
              <div>
                <div className="text-gray-500">Jobs</div>
                <div className="text-xs text-gray-900">{row.jobs}</div>
              </div>
              <div>
                <div className="text-gray-500">Work Cost</div>
                <div className="text-xs text-gray-900">{row.workCost}</div>
              </div>
              <div>
                <div className="text-gray-500">Tech Pay</div>
                <div className="text-xs text-gray-900">{row.techPay}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* table for md+ */}
      <div className="mt-2 hidden overflow-x-auto md:block">
        <table className="min-w-full border-separate border-spacing-0 text-xs">
          <thead>
            <tr className="text-left text-[11px] text-gray-500">
              <th className="px-2 py-2">Sr no.</th>
              <th className="px-2 py-2">Locksmith Name</th>
              <th className="px-2 py-2">Initials</th>
              <th className="px-2 py-2">Salary Profile</th>
              <th className="px-2 py-2">Jobs</th>
              <th className="px-2 py-2">Work Cost</th>
              <th className="px-2 py-2">Tech Pay</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.id} className="text-[11px] text-gray-800">
                <td className="border-t border-gray-100 px-2 py-2">
                  {idx + 1}
                </td>
                <td className="border-t border-gray-100 px-2 py-2">
                  {row.locksmithName}
                </td>
                <td className="border-t border-gray-100 px-2 py-2">
                  {row.initials}
                </td>
                <td className="border-t border-gray-100 px-2 py-2">
                  {row.salaryProfile}
                </td>
                <td className="border-t border-gray-100 px-2 py-2">
                  {row.jobs}
                </td>
                <td className="border-t border-gray-100 px-2 py-2">
                  {row.workCost}
                </td>
                <td className="border-t border-gray-100 px-2 py-2">
                  {row.techPay}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* totals row */}
      <div className="mt-3 flex flex-col gap-1 text-xs text-blue-600 md:flex-row md:gap-6">
        <button
          type="button"
          className={cn(
            "w-fit text-left font-semibold hover:underline"
          )}
        >
          Total Company Pay {totalCompanyPay}
        </button>
        <button
          type="button"
          className="w-fit text-left font-semibold hover:underline"
        >
          Platform Profit {platformProfit}
        </button>
      </div>
    </div>
  );
};

export default PaymentProfileTable;
