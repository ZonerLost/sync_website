import React from "react";
import Toolbar from "../shared/layout/Toolbar";
import TextField from "../shared/inputs/TextField";
import { cn } from "../../utils/cn";

interface SearchJobsToolbarProps {
  companyName: string;
  postCode: string;
  onCompanyNameChange: (value: string) => void;
  onPostCodeChange: (value: string) => void;
  onSubmit: () => void;
}

const SearchJobsToolbar: React.FC<SearchJobsToolbarProps> = ({
  companyName,
  postCode,
  onCompanyNameChange,
  onPostCodeChange,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Toolbar className="bg-transparent p-0 shadow-none">
        <div className="flex w-full flex-col gap-3 rounded-3xl bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:gap-4 sm:p-4">
          <TextField
            containerClassName="flex-1"
            label="Company Name"
            placeholder=""
            value={companyName}
            onChange={(e) => onCompanyNameChange(e.target.value)}
          />
          <TextField
            containerClassName="flex-1 sm:max-w-xs"
            label="Post Code"
            placeholder=""
            value={postCode}
            onChange={(e) => onPostCodeChange(e.target.value)}
          />
          <div className="flex shrink-0 items-end">
            <button
              type="submit"
              className={cn(
                "h-11 w-full rounded-2xl bg-[#0F5CCF] px-6 text-sm font-semibold text-white",
                "hover:bg-[#0d4fb3] focus:outline-none focus:ring-2 focus:ring-blue-200"
              )}
            >
              Search
            </button>
          </div>
        </div>
      </Toolbar>
    </form>
  );
};

export default SearchJobsToolbar;
