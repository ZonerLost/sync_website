import React from "react";
import PageContainer from "../../components/shared/layout/PageContainer";
import CompanyListToolbar from "../../components/company/CompanyListToolbar";
import DailyCompanySummary, {
  type DailySummaryMetric,
} from "../../components/company/DailyCompanySummary";
import PaymentProfileTable, {
  type PaymentProfileRow,
} from "../../components/company/PaymentProfileTable";
import SlideOver from "../../components/shared/overlay/SlideOver";
import AddCompanyPanel, {
  type CompanyFormValues,
} from "../../components/company/AddCompanyPanel";
import type { Company } from "../../models/company";
import { MOCK_COMPANIES } from "./mockCompanies";
import { cn } from "../../utils/cn";

const DailyCompanyPage: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const [, setCompanies] = React.useState<Company[]>(MOCK_COMPANIES);

  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const metrics: DailySummaryMetric[] = [
    { id: "jobs", label: "Total Jobs", value: "04" },
    { id: "workCost", label: "Total Work Cost", value: "$0.00" },
    { id: "materials", label: "Total Materials", value: "$0.00" },
    { id: "techPay", label: "Total Tech Pay", value: "$0.00" },
    { id: "coPay", label: "Total Co. Pay", value: "$0.00" },
    { id: "profit", label: "Total Profit", value: "$0.00" },
  ];

  const rows: PaymentProfileRow[] = [
    {
      id: "r-1",
      locksmithName: "TS6 6UD",
      initials: "-",
      salaryProfile: "Card Payment",
      jobs: 1,
      workCost: "$0.00",
      techPay: "$0.00",
    },
    {
      id: "r-2",
      locksmithName: "TS6 6UD",
      initials: "-",
      salaryProfile: "Card Payment",
      jobs: 1,
      workCost: "$0.00",
      techPay: "$0.00",
    },
  ];

  const handleNewCompany = () => {
    setIsFormOpen(true);
  };

  const handleSaveCompany = (values: CompanyFormValues) => {
    const newCompany: Company = {
      id: `c-${Date.now()}`,
      status: "active",
      ...values,
    };
    setCompanies((prev) => [newCompany, ...prev]);
    setIsFormOpen(false);
  };

  const today = new Date();
  const periodLabel = `Period: ${today.toISOString().slice(0, 10)} to ${today
    .toISOString()
    .slice(0, 10)}`;

  return (
    <PageContainer fullWidth>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 md:text-xl">
              Daily Company
            </h1>
            <p className="text-xs text-gray-500 sm:text-sm">
              Search companies, export daily PDFs, and manage payout profiles.
            </p>
          </div>

          <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:justify-end">
            <button
              type="button"
              className={cn(
                "inline-flex h-11 w-full items-center justify-center rounded-2xl bg-black px-5 text-sm font-semibold text-white",
                "hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700/40 sm:hidden"
              )}
            >
              Export PDF Report
            </button>
            <button
              type="button"
              className={cn(
                "hidden h-11 items-center rounded-2xl bg-black px-5 text-sm font-semibold text-white",
                "hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700/40",
                "sm:inline-flex"
              )}
            >
              Export PDF Report
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5 sm:px-5">
          <CompanyListToolbar
            search={search}
            onSearchChange={setSearch}
            onNewCompany={handleNewCompany}
            placeholder="Search here"
            buttonLabel="+ New Company"
          />
        </div>

        <div className="rounded-3xl bg-[#f5f5f6] px-4 py-3 shadow-inner sm:px-5 sm:py-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-semibold text-gray-900">
              All Companies
            </div>
            <div className="text-xs text-gray-500 sm:text-right">
              {periodLabel}
            </div>
          </div>

          <DailyCompanySummary metrics={metrics} />

          <div className="space-y-4 md:space-y-5">
            <PaymentProfileTable
              title="PAYMENT PROFILE : 50% | Jobs: 1"
              rows={rows}
              totalCompanyPay="$0.00"
              platformProfit="$0.00"
            />

            <PaymentProfileTable
              title="PAYMENT PROFILE : 50% | Jobs: 1"
              rows={rows}
              totalCompanyPay="$0.00"
              platformProfit="$0.00"
            />
          </div>
        </div>
      </div>

      <SlideOver
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        widthClassName="w-full sm:max-w-md lg:max-w-lg"
      >
        <AddCompanyPanel
          mode="create"
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveCompany}
        />
      </SlideOver>
    </PageContainer>
  );
};

export default DailyCompanyPage;
