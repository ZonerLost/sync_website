import React from "react";

export interface RevenueRow {
  id: string;
  name: string;
  since: string;
  jobs: number;
  cancelled: number;
  avgJob: string;
  revenue: string;
  matReimbursable: string;
  matCumulated: string;
  vat: string;
  techPay: string;
}

interface LocksmithRevenueTableProps {
  rows: RevenueRow[];
}

const LocksmithRevenueTable: React.FC<LocksmithRevenueTableProps> = ({
  rows,
}) => {
  const totals = {
    jobs: rows.reduce((sum, row) => sum + row.jobs, 0),
    cancelled: rows.reduce((sum, row) => sum + row.cancelled, 0),
    avgJob: "Aś0.00",
    revenue: "Aś0.00",
    matReimbursable: "Aś0.00",
    matCumulated: "Aś0.00",
    vat: "Aś0.00",
    techPay: "Aś0.00",
  };

  return (
    <div className="mt-4 rounded-3xl bg-white px-3 py-3 shadow-sm sm:px-4">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-gray-900">
        <span>Locksmith Revenue</span>
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#0F5CCF]/10 px-2 text-[11px] text-[#0F5CCF]">
          {rows.length}
        </span>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {rows.map((row) => (
          <div
            key={row.id}
            className="rounded-2xl border border-gray-100 bg-[#f7f8fb] p-3 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {row.name}
                </p>
                <p className="text-[11px] text-gray-500">Since {row.since}</p>
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                <span className="rounded-full bg-[#E4F0FF] px-2 py-1 text-[11px] font-semibold text-[#0F5CCF]">
                  Jobs {row.jobs}
                </span>
                <span className="rounded-full bg-[#FFECEC] px-2 py-1 text-[11px] font-semibold text-[#D14343]">
                  {row.cancelled} Cancelled
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-gray-700">
              {[
                { label: "Avg Job", value: row.avgJob },
                { label: "Revenue", value: row.revenue },
                { label: "Mat Rembursable", value: row.matReimbursable },
                { label: "Mat Cumulated", value: row.matCumulated },
                { label: "VAT", value: row.vat },
                { label: "Tech Pay", value: row.techPay },
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
          </div>
        ))}

        <div className="rounded-2xl border border-[#0F5CCF]/20 bg-[#E4F0FF]/30 p-3">
          <div className="text-xs font-semibold text-[#0F5CCF]">Total</div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-gray-700">
            {[
              { label: "Jobs", value: totals.jobs },
              { label: "Cancelled", value: totals.cancelled },
              { label: "Avg Job", value: totals.avgJob },
              { label: "Revenue", value: totals.revenue },
              { label: "Mat Rembursable", value: totals.matReimbursable },
              { label: "Mat Cumulated", value: totals.matCumulated },
              { label: "VAT", value: totals.vat },
              { label: "Tech Pay", value: totals.techPay },
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
      <div className="-mx-3 hidden overflow-x-auto md:mx-0 md:block">
        <table className="min-w-[640px] border-separate border-spacing-0 text-[11px] sm:min-w-full sm:text-xs">
          <thead>
            <tr className="text-[11px] text-gray-500">
              <th className="px-2 py-2 text-left">Name</th>
              <th className="px-2 py-2 text-left">Since</th>
              <th className="px-2 py-2 text-right">Jobs</th>
              <th className="px-2 py-2 text-right">Cancelled</th>
              <th className="px-2 py-2 text-right">Avg Job</th>
              <th className="px-2 py-2 text-right">Revenue</th>
              <th className="px-2 py-2 text-right">Mat Rembursable</th>
              <th className="px-2 py-2 text-right">Mat Cumulated</th>
              <th className="px-2 py-2 text-right">VAT</th>
              <th className="px-2 py-2 text-right">Tech Pay</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="text-[11px] text-gray-800">
                <td className="border-t border-gray-100 px-2 py-2">
                  {row.name}
                </td>
                <td className="border-t border-gray-100 px-2 py-2">
                  {row.since}
                </td>
                <td className="border-t border-gray-100 px-2 py-2 text-right">
                  {row.jobs}
                </td>
                <td className="border-t border-gray-100 px-2 py-2 text-right">
                  {row.cancelled}
                </td>
                <td className="border-t border-gray-100 px-2 py-2 text-right">
                  {row.avgJob}
                </td>
                <td className="border-t border-gray-100 px-2 py-2 text-right">
                  {row.revenue}
                </td>
                <td className="border-t border-gray-100 px-2 py-2 text-right">
                  {row.matReimbursable}
                </td>
                <td className="border-t border-gray-100 px-2 py-2 text-right">
                  {row.matCumulated}
                </td>
                <td className="border-t border-gray-100 px-2 py-2 text-right">
                  {row.vat}
                </td>
                <td className="border-t border-gray-100 px-2 py-2 text-right">
                  {row.techPay}
                </td>
              </tr>
            ))}

            {/* Total row */}
            <tr className="text-[11px] font-semibold text-[#0F5CCF]">
              <td className="px-2 py-2">Total</td>
              <td className="px-2 py-2" />
              <td className="px-2 py-2 text-right">{totals.jobs}</td>
              <td className="px-2 py-2 text-right">{totals.cancelled}</td>
              <td className="px-2 py-2 text-right">{totals.avgJob}</td>
              <td className="px-2 py-2 text-right">{totals.revenue}</td>
              <td className="px-2 py-2 text-right">{totals.matReimbursable}</td>
              <td className="px-2 py-2 text-right">{totals.matCumulated}</td>
              <td className="px-2 py-2 text-right">{totals.vat}</td>
              <td className="px-2 py-2 text-right">{totals.techPay}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocksmithRevenueTable;



