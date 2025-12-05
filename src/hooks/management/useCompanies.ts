import { useMemo, useState } from "react";

export type CompanyStatus = "active" | "inactive";

export type Company = {
  id: string;
  name: string;
  commissionPercent: number;
  email?: string;
  phone?: string;
  status: CompanyStatus;
  createdAt?: string;
};

const seed: Company[] = [
  {
    id: "c1",
    name: "A Locksmith - Supreme",
    commissionPercent: 55,
    email: "supreme@example.com",
    phone: "+1 (78) 456456 56",
    status: "active",
  },
  {
    id: "c2",
    name: "A Locksmith - Supreme",
    commissionPercent: 55,
    email: "supreme2@example.com",
    phone: "+1 (78) 456456 56",
    status: "active",
  },
  {
    id: "c3",
    name: "A Locksmith - Supreme",
    commissionPercent: 55,
    email: "supreme3@example.com",
    phone: "+1 (78) 456456 56",
    status: "active",
  },
];

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>(seed);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) => c.name.toLowerCase().includes(q));
  }, [companies, search]);

  const createCompany = (payload: Omit<Company, "id">) => {
    const next: Company = {
      ...payload,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setCompanies((prev) => [next, ...prev]);
  };

  const updateCompany = (id: string, patch: Partial<Company>) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch } : c))
    );
  };

  const removeCompany = (id: string) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    companies,
    filtered,
    search,
    setSearch,
    createCompany,
    updateCompany,
    removeCompany,
  };
};
