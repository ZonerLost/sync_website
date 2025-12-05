import React from "react";
import PillFilterGroup, {
  type PillOption,
} from "../inputs/PillFilterGroup";

interface MapStatusLegendProps {
  value: string;
  onChange: (id: string) => void;
}

const options: PillOption[] = [
  { id: "open", label: "Open", count: 2, variant: "open" },
  { id: "completed", label: "Completed", count: 2, variant: "completed" },
  { id: "onHold", label: "On Hold", count: 2, variant: "onHold" },
  { id: "appointments", label: "Appointments", count: 2, variant: "appointments" },
  { id: "cancelled", label: "Cancelled", count: 2, variant: "cancelled" },
];

const MapStatusLegend: React.FC<MapStatusLegendProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="rounded-full bg-white/90 px-3 py-2 shadow-sm">
      <PillFilterGroup options={options} value={value} onChange={onChange} />
    </div>
  );
};

export default MapStatusLegend;
