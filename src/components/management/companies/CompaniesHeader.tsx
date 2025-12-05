import React from "react";

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  onAdd: () => void;
};

const CompaniesHeader: React.FC<Props> = ({
  search,
  onSearchChange,
  onAdd,
}) => {
  return (
    <div className="space-y-3">
      <h1 className="text-lg font-semibold text-gray-900">Companies</h1>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search bar */}
        <div className="flex-1 rounded-2xl bg-gray-100 px-4 py-3">
          <label className="block text-[10px] text-gray-500 mb-1">
            Search here
          </label>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Type company name..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        {/* Add button */}
        <button
          type="button"
          onClick={onAdd}
          className="w-full lg:w-auto rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium text-white hover:bg-blue-700 lg:min-w-[160px]"
        >
          + New Company
        </button>
      </div>
    </div>
  );
};

export default CompaniesHeader;
