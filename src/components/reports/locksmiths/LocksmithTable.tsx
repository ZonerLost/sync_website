import React from "react";
import { cn } from "../../../utils/cn";

export interface LocksmithRow {
  id: string;
  postcode: string;
  invoice: string;
  authNo: string;
  workCost: string;
  matReimbursable: string;
  matCumulated: string;
  payType: string;
  cash: string;
  credit: string;
  vat: string;
}

interface LocksmithTableProps {
  title: string; // e.g. "Z1Z1"
  totalJobs: number; // blue pill number
  rows: LocksmithRow[];
}

const LocksmithTable: React.FC<LocksmithTableProps> = ({
  title,
  totalJobs,
  rows,
}) => {
  const totals = {
    workCost: "Aś0.00",
    matReimbursable: "Aś0.00",
    matCumulated: "Aś0.00",
    cash: "Aś0.00",
    credit: "Aś0.00",
    vat: "Aś0.00",
  };

  return (
    <div className="mt-5 rounded-3xl bg-white px-3 py-3 shadow-sm md:px-4">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-900">
        <span>{title}</span>
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#0F5CCF]/10 px-2 text-[11px] text-[#0F5CCF]">
          {totalJobs}
        </span>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {rows.map((row, idx) => (
          <div
            key={row.id}
            className="rounded-2xl border border-gray-100 bg-[#f7f8fb] p-3 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] text-gray-500">Job #{idx + 1}</p>
                <p className="truncate text-sm font-semibold text-gray-900">
                  {row.postcode}
                </p>
                <p className="text-[11px] text-gray-500">{row.invoice}</p>
                <p className="text-[11px] text-gray-500">Auth: {row.authNo}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="rounded-full bg-[#E4F0FF] px-2 py-1 text-[11px] font-semibold text-[#0F5CCF]">
                  {row.payType}
                </span>
                <span className="text-[10px] text-gray-500">V.A.T {row.vat}</span>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                className={cn(
                  "flex-1 min-w-[140px] rounded-2xl bg-[#FFF4C2] px-3 py-2 text-[11px] font-semibold text-gray-800"
                )}
              >
                View Photos
              </button>
              <button
                type="button"
                className="flex-1 min-w-[140px] rounded-2xl bg-[#E4F0FF] px-3 py-2 text-[11px] font-semibold text-[#0F5CCF]"
              >
                View Details
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-gray-700">
              {[
                { label: "Work Cost", value: row.workCost },
                { label: "Mat Rembursable", value: row.matReimbursable },
                { label: "Mat Cumulated", value: row.matCumulated },
                { label: "Auth no.", value: row.authNo },
              ].map((item) => (
                <div
                  key={`${row.id}-${item.label}`}
                  className="rounded-2xl bg-white px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                >
                  <div className="text-[10px] uppercase tracking-wide text-gray-500">
                    {item.label}
                  </div>
                  <div className="text-xs font-semibold text-gray-900">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-gray-700 sm:grid-cols-3">
              {[
                { label: "Cash", value: row.cash },
                { label: "Credit", value: row.credit },
                { label: "V.A.T", value: row.vat, className: "col-span-2 sm:col-span-1" },
              ].map((item) => (
                <div
                  key={`${row.id}-${item.label}-amount`}
                  className={cn(
                    "rounded-2xl bg-white px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]",
                    item.className
                  )}
                >
                  <div className="text-[10px] uppercase tracking-wide text-gray-500">
                    {item.label}
                  </div>
                  <div className="text-xs font-semibold text-gray-900">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-[#0F5CCF]/20 bg-[#E4F0FF]/30 p-3">
          <div className="text-xs font-semibold text-[#0F5CCF]">Total</div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-gray-700 sm:grid-cols-3">
            {[
              { label: "Work Cost", value: totals.workCost },
              { label: "Mat Rembursable", value: totals.matReimbursable },
              { label: "Mat Cumulated", value: totals.matCumulated },
              { label: "Cash", value: totals.cash },
              { label: "Credit", value: totals.credit },
              { label: "V.A.T", value: totals.vat },
            ].map((item) => (
              <div
                key={`total-${item.label}`}
                className="rounded-2xl bg-white px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
              >
                <div className="text-[10px] uppercase tracking-wide text-[#0F5CCF]">
                  {item.label}
                </div>
                <div className="text-xs font-semibold text-[#0F5CCF]">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full border-separate border-spacing-0 text-xs">
          <thead>
            <tr className="text-[11px] text-gray-500">
              <th className="px-2 py-2 text-left">Sr no.</th>
              <th className="px-2 py-2 text-left">Actions</th>
              <th className="px-2 py-2 text-left">Post Code</th>
              <th className="px-2 py-2 text-left">Invoice</th>
              <th className="px-2 py-2 text-left">Auth no.</th>
              <th className="px-2 py-2 text-right">Work Cost</th>
              <th className="px-2 py-2 text-right">Mat Rembursable</th>
              <th className="px-2 py-2 text-right">Mat Cumulated</th>
              <th className="px-2 py-2 text-left">Pay Type</th>
              <th className="px-2 py-2 text-right">Cash</th>
              <th className="px-2 py-2 text-right">Credit</th>
              <th className="px-2 py-2 text-right">V.A.T</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.id} className="text-[11px] text-gray-800">
                <td className="border-t border-gray-100 px-2 py-2">
                  {idx + 1}
                </td>
                <td className="border-t border-gray-100 px-2 py-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className={cn(
                        "rounded-2xl bg-[#FFF4C2] px-3 py-1 text-[11px] font-semibold text-gray-800"
                      )}
                    >
                      View Photos
                    </button>
                    <button
                      type="button"
                      className="rounded-2xl bg-[#E4F0FF] px-3 py-1 text-[11px] font-semibold text-[#0F5CCF]"
                    >
                      View Details
                    </button>
                  </div>
                </td>
                <td className="border-t border-gray-100 px-2 py-2">
                  {row.postcode}
                </td>
                <td className="border-t border-gray-100 px-2 py-2">
                  {row.invoice}
                </td>
                <td className="border-t border-gray-100 px-2 py-2">
                  {row.authNo}
                </td>
                <td className="border-t border-gray-100 px-2 py-2 text-right">
                  {row.workCost}
                </td>
                <td className="border-t border-gray-100 px-2 py-2 text-right">
                  {row.matReimbursable}
                </td>
                <td className="border-t border-gray-100 px-2 py-2 text-right">
                  {row.matCumulated}
                </td>
                <td className="border-t border-gray-100 px-2 py-2">
                  {row.payType}
                </td>
                <td className="border-t border-gray-100 px-2 py-2 text-right">
                  {row.cash}
                </td>
                <td className="border-t border-gray-100 px-2 py-2 text-right">
                  {row.credit}
                </td>
                <td className="border-t border-gray-100 px-2 py-2 text-right">
                  {row.vat}
                </td>
              </tr>
            ))}

            {/* Total row */}
            <tr className="text-[11px] font-semibold text-[#0F5CCF]">
              <td className="px-2 py-2">Total</td>
              <td className="px-2 py-2" colSpan={4}>
                {/* blue underline bar like Figma */}
                <div className="mt-1 h-1 rounded-full bg-[#0F5CCF]" />
              </td>
              <td className="px-2 py-2 text-right">{totals.workCost}</td>
              <td className="px-2 py-2 text-right">{totals.matReimbursable}</td>
              <td className="px-2 py-2 text-right">{totals.matCumulated}</td>
              <td className="px-2 py-2" />
              <td className="px-2 py-2 text-right">{totals.cash}</td>
              <td className="px-2 py-2 text-right">{totals.credit}</td>
              <td className="px-2 py-2 text-right">{totals.vat}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocksmithTable;


