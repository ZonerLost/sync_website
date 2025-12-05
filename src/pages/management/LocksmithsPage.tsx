import React, { useMemo, useState } from "react";
import PageContainer from "../../components/shared/layout/PageContainer";
import SearchBar from "../../components/shared/inputs/SearchBar";
import PrimaryButton from "../../components/shared/buttons/PrimaryButton";
import ManagementListItem, {
  type ManagementUser,
} from "../../components/management/ManagementListItem";
import AddLocksmithDrawer, {
  type NewLocksmithForm,
} from "./components/AddLocksmithDrawer";

const INITIAL_LOCKSMITHS: ManagementUser[] = [
  {
    id: "1",
    name: "#2 Dan Teste",
    email: "dantaste23@gmail.com",
    phone: "+1(78) 456456 56",
    statusLabel: "Free",
    statusVariant: "blue",
  },
  {
    id: "2",
    name: "#3 Dan Teste",
    email: "dantaste23@gmail.com",
    phone: "+1(78) 456456 56",
    statusLabel: "Free",
    statusVariant: "blue",
  },
];

const LocksmithsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locksmiths, setLocksmiths] =
    useState<ManagementUser[]>(INITIAL_LOCKSMITHS);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) return locksmiths;
    return locksmiths.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
  }, [locksmiths, searchTerm]);

  const handleCreate = (data: NewLocksmithForm) => {
    const newUser: ManagementUser = {
      id: Date.now().toString(),
      name: `${data.firstName} ${data.lastName}`.trim(),
      email: data.email,
      phone: data.phone,
      statusLabel: "Free",
      statusVariant: "blue",
    };
    setLocksmiths((prev) => [newUser, ...prev]);
  };

  return (
    <PageContainer fullWidth>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-sm font-semibold text-neutral-900 sm:text-base">
          Lock Smiths
        </h1>
        <PrimaryButton
          onClick={() => setIsAddOpen(true)}
          className="w-full sm:w-auto"
        >
          + Add Locksmith
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
          {filtered.length} locksmiths found
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {filtered.map((user) => (
          <ManagementListItem key={user.id} user={user} />
        ))}
      </div>

      <AddLocksmithDrawer
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleCreate}
      />
    </PageContainer>
  );
};

export default LocksmithsPage;
