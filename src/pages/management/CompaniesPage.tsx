import React, { useState } from "react";
import CompaniesHeader from "../../components/management/companies/CompaniesHeader";
import CompaniesList from "../../components/management/companies/CompaniesList";
import CompanyFormDrawer from "../../components/management/companies/CompanyFormDrawer";
import { useCompanies, type Company } from "../../hooks/management/useCompanies";

const CompaniesPage: React.FC = () => {
  const {
    filtered,
    search,
    setSearch,
    createCompany,
    updateCompany,
    removeCompany,
  } = useCompanies();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<Company | null>(null);

  const handleAdd = () => {
    setMode("create");
    setSelected(null);
    setDrawerOpen(true);
  };

  const handleEdit = (c: Company) => {
    setMode("edit");
    setSelected(c);
    setDrawerOpen(true);
  };

  const handleDelete = (c: Company) => {
    const ok = window.confirm(`Delete "${c.name}"?`);
    if (!ok) return;
    removeCompany(c.id);
  };

  const handleSubmit = (values: {
    name: string;
    commissionPercent: number;
    email: string;
    phone: string;
    status: "active" | "inactive";
  }) => {
    if (mode === "create") {
      createCompany(values);
    } else if (selected) {
      updateCompany(selected.id, values);
    }
    setDrawerOpen(false);
  };

  return (
    <div className="space-y-5">
      <CompaniesHeader
        search={search}
        onSearchChange={setSearch}
        onAdd={handleAdd}
      />

      <CompaniesList
        items={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CompanyFormDrawer
        open={drawerOpen}
        mode={mode}
        initial={selected}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CompaniesPage;
