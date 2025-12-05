import React from "react";
import TextField from "../shared/inputs/TextField";
import { cn } from "../../utils/cn";

interface CompanyListToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onNewCompany: () => void;
  placeholder?: string;
  buttonLabel?: string;
}

const CompanyListToolbar: React.FC<CompanyListToolbarProps> = ({
  search,
  onSearchChange,
  onNewCompany,
  placeholder = "",
  buttonLabel = "+ New Company",
}) => {
  return (
    <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex-1">
        <TextField
          label={undefined}
          placeholder={placeholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          containerClassName="w-full"
        />
      </div>

      <button
        type="button"
        onClick={onNewCompany}
        className={cn(
          "h-11 w-full rounded-2xl bg-[#0F5CCF] px-6 text-sm font-semibold text-white",
          "sm:w-auto",
          "hover:bg-[#0d4fb3] focus:outline-none focus:ring-2 focus:ring-blue-200"
        )}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default CompanyListToolbar;
