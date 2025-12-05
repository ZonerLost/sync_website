import React from "react";

export type WeeklyCompaniesOutFilterValue = {
  startDate: string; // ISO yyyy-mm-dd
  endDate: string;   // ISO yyyy-mm-dd
  operatorId: string;
};

type Props = {
  value: WeeklyCompaniesOutFilterValue;
  onChange: (next: WeeklyCompaniesOutFilterValue) => void;
  onRun: () => void;
  loading?: boolean;
};

const WeeklyCompaniesOutFilters: React.FC<Props> = ({
  value,
  onChange,
  onRun,
  loading,
}) => {
  const set = (patch: Partial<WeeklyCompaniesOutFilterValue>) =>
    onChange({ ...value, ...patch });

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      {/* Date range area */}
      <div className="flex w-full flex-col gap-2 sm:flex-row lg:flex-1">
        <div className="flex-1 rounded-2xl bg-gray-100 px-4 py-3">
          <label className="block text-[10px] text-gray-500 mb-1">
            From
          </label>
          <input
            type="date"
            value={value.startDate}
            onChange={(e) => set({ startDate: e.target.value })}
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <div className="flex-1 rounded-2xl bg-gray-100 px-4 py-3">
          <label className="block text-[10px] text-gray-500 mb-1">
            To
          </label>
          <input
            type="date"
            value={value.endDate}
            onChange={(e) => set({ endDate: e.target.value })}
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* Operators dropdown */}
      <div className="w-full lg:w-[280px] rounded-2xl bg-gray-100 px-4 py-3">
        <label className="block text-[10px] text-gray-500 mb-1">
          Operators
        </label>
        <select
          value={value.operatorId}
          onChange={(e) => set({ operatorId: e.target.value })}
          className="w-full bg-transparent text-sm outline-none"
        >
          <option value="all">All Operators</option>
          <option value="ZIZ1">ZIZ1</option>
          <option value="OVIDIUSN/GL">OVIDIUSN/GL</option>
          <option value="OP-TEST">OP-TEST</option>
        </select>
      </div>

      {/* Show report button */}
      <div className="w-full lg:w-auto">
        <button
          type="button"
          onClick={onRun}
          disabled={loading}
          className="w-full rounded-2xl bg-black px-6 py-4 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-60 lg:min-w-[150px]"
        >
          {loading ? "Loading..." : "Show report"}
        </button>
      </div>
    </div>
  );
};

export default WeeklyCompaniesOutFilters;
