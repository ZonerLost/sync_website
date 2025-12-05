import React, { useMemo, useState } from "react";
import SearchBar from "../../components/shared/inputs/SearchBar";
import PrimaryButton from "../../components/shared/buttons/PrimaryButton";
import ManagementListItem, {
  type ManagementUser,
} from "../../components/management/ManagementListItem";
import AddPersonDrawer, {
  type NewPersonForm,
} from "./components/AddPersonDrawer";

const INITIAL_OPERATORS: ManagementUser[] = [
  {
    id: "1",
    name: "Comin Dispatch",
    email: "dantaste23@gmail.com",
    phone: "+1(78) 456456 56",
    statusLabel: "Active",
    statusVariant: "green",
  },
];

const OperatorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [operators, setOperators] =
    useState<ManagementUser[]>(INITIAL_OPERATORS);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) return operators;
    return operators.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
  }, [operators, searchTerm]);

  const handleCreate = (data: NewPersonForm) => {
    const newUser: ManagementUser = {
      id: Date.now().toString(),
      name: `${data.firstName} ${data.lastName}`.trim(),
      email: data.email,
      phone: data.phone,
      statusLabel: "Active",
      statusVariant: "green",
    };
    setOperators((prev) => [newUser, ...prev]);
  };

  return (
    <div className="px-6 py-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-sm font-medium text-neutral-900">Operators</h1>
        <PrimaryButton onClick={() => setIsAddOpen(true)}>
          + Add Operator
        </PrimaryButton>
      </div>

      <div className="mb-3 max-w-xl">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search here"
        />
      </div>

      <p className="mb-3 text-[11px] text-neutral-500">
        {filtered.length} operators found
      </p>

      <div className="space-y-3">
        {filtered.map((user) => (
          <ManagementListItem key={user.id} user={user} />
        ))}
      </div>

      <AddPersonDrawer
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleCreate}
        title="Add a new Operator"
        description="Please add the information to add new operator."
        submitLabel="Add →"
      />
    </div>
  );
};

export default OperatorsPage;
