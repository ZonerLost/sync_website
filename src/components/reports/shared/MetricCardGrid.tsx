import React from "react";

export interface MetricItem {
  id: string;
  label: string;
  value: string;
}

interface MetricCardGridProps {
  metrics: MetricItem[];
  columns?: number;
}

const getGridColumnsClass = (columns: number) => {
  switch (columns) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-1 sm:grid-cols-2";
    case 3:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    default:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  }
};

const MetricCardGrid: React.FC<MetricCardGridProps> = ({
  metrics,
  columns = 3,
}) => {
  const gridColumnsClass = getGridColumnsClass(columns);

  return (
    <div className={`mt-3 grid gap-3 ${gridColumnsClass}`}>
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="rounded-3xl bg-white px-4 py-3 text-xs shadow-sm"
        >
          <div className="text-sm font-semibold text-gray-900">
            {metric.value}
          </div>
          <div className="mt-1 text-[11px] text-gray-500">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricCardGrid;
