export type CompanyStatus = "active" | "inactive";

export interface Company {
  id: string;
  name: string;
  commission: number; // e.g. 55
  email: string;
  phone: string;
  status: CompanyStatus;
}
