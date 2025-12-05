import React from "react";

export interface DailySummaryMetric {
  id: string;
  label: string;
  value: string;
}

interface DailyCompanySummaryProps {
  metrics: DailySummaryMetric[];
}

const DailyCompanySummary: React.FC<DailyCompanySummaryProps> = ({
  metrics,
}) => {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {metrics.map((m) => (
        <div
          key={m.id}
          className="rounded-3xl bg-white px-4 py-3 text-xs shadow-sm"
        >
          <div className="text-sm font-semibold text-gray-900">
            {m.value}
          </div>
          <div className="mt-1 text-[11px] text-gray-500">{m.label}</div>
        </div>
      ))}
    </div>
  );
};

export default DailyCompanySummary;
