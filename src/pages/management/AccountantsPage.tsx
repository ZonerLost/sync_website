import React, { useMemo, useState } from "react";
import PageContainer from "../../components/shared/layout/PageContainer";
import SearchBar from "../../components/shared/inputs/SearchBar";
import PrimaryButton from "../../components/shared/buttons/PrimaryButton";
import ManagementListItem, {
  type ManagementUser,
} from "../../components/management/ManagementListItem";
import AddPersonDrawer, {
  type NewPersonForm,
} from "./components/AddPersonDrawer";

const INITIAL_ACCOUNTANTS: ManagementUser[] = [
  {
    id: "1",
    name: "Comin Dispatch",
    email: "dantaste23@gmail.com",
    phone: "+1(78) 456456 56",
    statusLabel: "Active",
    statusVariant: "green",
  },
];

const AccountantsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [accountants, setAccountants] =
    useState<ManagementUser[]>(INITIAL_ACCOUNTANTS);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) return accountants;
    return accountants.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
  }, [accountants, searchTerm]);

  const handleCreate = (data: NewPersonForm) => {
    const newUser: ManagementUser = {
      id: Date.now().toString(),
      name: `${data.firstName} ${data.lastName}`.trim(),
      email: data.email,
      phone: data.phone,
      statusLabel: "Active",
      statusVariant: "green",
    };
    setAccountants((prev) => [newUser, ...prev]);
  };

  return (
    <PageContainer fullWidth>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-sm font-semibold text-neutral-900 sm:text-base">
          Accountants
        </h1>
        <PrimaryButton
          onClick={() => setIsAddOpen(true)}
          className="w-full sm:w-auto"
        >
          + Add Accountant
        </PrimaryButton>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xl">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search here"
          />
        </div>
        <p className="text-[11px] text-neutral-500 sm:text-xs">
          {filtered.length} accountants found
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {filtered.map((user) => (
          <ManagementListItem key={user.id} user={user} />
        ))}
      </div>

      <AddPersonDrawer
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleCreate}
        title="Add a new Accountant"
        description="Please add the information to add new accountant."
        submitLabel="Add "
      />
    </PageContainer>
  );
};

export default AccountantsPage;
