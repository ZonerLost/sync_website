import React, { useMemo, useState } from "react";
import SearchBar from "../../components/shared/inputs/SearchBar";
import ManagementListItem, {
  type ManagementUser,
} from "../../components/management/ManagementListItem";

const INITIAL_EMAILS: ManagementUser[] = [
  {
    id: "1",
    name: "Comin Operator",
    email: "dantaste23@gmail.com",
    statusLabel: "Active",
    statusVariant: "green",
  },
  {
    id: "2",
    name: "Comin Operator",
    email: "dantaste23@gmail.com",
    statusLabel: "Active",
    statusVariant: "green",
  },
];

const EmailAddressesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [emails] = useState<ManagementUser[]>(INITIAL_EMAILS);

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) return emails;
    return emails.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
  }, [emails, searchTerm]);

  return (
    <div className="px-6 py-4">
      <h1 className="mb-4 text-sm font-medium text-neutral-900">
        Email addresses
      </h1>

      <div className="mb-3 max-w-xl">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search here"
        />
      </div>

      <p className="mb-3 text-[11px] text-neutral-500">
        {filtered.length} emails found
      </p>

      <div className="space-y-3">
        {filtered.map((user) => (
          <ManagementListItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default EmailAddressesPage;
