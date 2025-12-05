import React from "react";
import PageContainer from "../../components/shared/layout/PageContainer";
import CompanyListToolbar from "../../components/company/CompanyListToolbar";
import CompanyListItem from "../../components/company/CompanyListItem";
import SlideOver from "../../components/shared/overlay/SlideOver";
import ConfirmDialog from "../../components/shared/overlay/ConfirmDialog";
import AddCompanyPanel, {
  type CompanyFormValues,
} from "../../components/company/AddCompanyPanel";
import type { Company } from "../../models/company";
import { MOCK_COMPANIES } from "./mockCompanies";

const CompanyListPage: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const [companies, setCompanies] = React.useState<Company[]>(MOCK_COMPANIES);

  const [editingCompany, setEditingCompany] = React.useState<Company | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const [toDelete, setToDelete] = React.useState<Company | null>(null);

  const filteredCompanies = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) => c.name.toLowerCase().includes(q));
  }, [companies, search]);

  const openCreate = () => {
    setEditingCompany(null);
    setIsFormOpen(true);
  };

  const openEdit = (company: Company) => {
    setEditingCompany(company);
    setIsFormOpen(true);
  };

  const handleSave = (values: CompanyFormValues) => {
    if (editingCompany) {
      setCompanies((prev) =>
        prev.map((c) =>
          c.id === editingCompany.id ? { ...c, ...values } : c
        )
      );
    } else {
      const newCompany: Company = {
        id: `c-${Date.now()}`,
        status: "active",
        ...values,
      };
      setCompanies((prev) => [newCompany, ...prev]);
    }

    setIsFormOpen(false);
    setEditingCompany(null);
  };

  const handleDelete = (company: Company) => {
    setToDelete(company);
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    setCompanies((prev) => prev.filter((c) => c.id !== toDelete.id));
    setToDelete(null);
  };

  const cancelDelete = () => setToDelete(null);

  return (
    <PageContainer fullWidth>
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-semibold text-gray-900 md:text-xl">
          Company List
        </h1>
        <p className="text-xs text-gray-500 sm:text-sm">
          Add, edit, or remove companies across devices.
        </p>
      </div>

      <div className="rounded-3xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5 sm:px-5">
        <CompanyListToolbar
          search={search}
          onSearchChange={setSearch}
          onNewCompany={openCreate}
          placeholder="Search here"
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500 sm:text-sm">
        <span>{filteredCompanies.length} Companies found</span>
        <button
          type="button"
          onClick={openCreate}
          className="hidden rounded-2xl bg-[#0F5CCF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0d4fb3] focus:outline-none focus:ring-2 focus:ring-blue-200 sm:inline-flex"
        >
          + New Company
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {filteredCompanies.map((company) => (
          <CompanyListItem
            key={company.id}
            company={company}
            onEdit={() => openEdit(company)}
            onDelete={() => handleDelete(company)}
          />
        ))}
      </div>

      <SlideOver
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCompany(null);
        }}
        widthClassName="w-full sm:max-w-md lg:max-w-lg"
      >
        <AddCompanyPanel
          mode={editingCompany ? "edit" : "create"}
          initialValues={
            editingCompany
              ? {
                  name: editingCompany.name,
                  commission: editingCompany.commission,
                  email: editingCompany.email,
                  phone: editingCompany.phone,
                }
              : undefined
          }
          onClose={() => {
            setIsFormOpen(false);
            setEditingCompany(null);
          }}
          onSave={handleSave}
        />
      </SlideOver>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this company?"
        description={toDelete ? `Are you sure you want to delete ${toDelete.name}?` : ""}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </PageContainer>
  );
};

export default CompanyListPage;
