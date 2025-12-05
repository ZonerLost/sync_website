import React from "react";
import type { Company } from "../../../hooks/management/useCompanies";
import CompanyRowCard from "./CompanyRowCard";

type Props = {
  items: Company[];
  onEdit: (c: Company) => void;
  onDelete: (c: Company) => void;
};

const CompaniesList: React.FC<Props> = ({ items, onEdit, onDelete }) => {
  return (
    <div className="space-y-3">
      <div className="text-xs text-gray-500">
        {items.length} Companies found
      </div>

      <div className="space-y-3">
        {items.map((c) => (
          <CompanyRowCard
            key={c.id}
            company={c}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CompaniesList;
