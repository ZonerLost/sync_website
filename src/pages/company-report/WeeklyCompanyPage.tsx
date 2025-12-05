import React from "react";
import PageContainer from "../../components/shared/layout/PageContainer";
import CompanyListToolbar from "../../components/company/CompanyListToolbar";
import DailyCompanySummary, {
  type DailySummaryMetric,
} from "../../components/company/DailyCompanySummary";
import PaymentProfileTable, {
  type PaymentProfileRow,
} from "../../components/company/PaymentProfileTable"
import SlideOver from "../../components/shared/overlay/SlideOver";
import AddCompanyPanel, {
  type CompanyFormValues,
} from "../../components/company/AddCompanyPanel";
import type { Company } from "../../models/company";
import { MOCK_COMPANIES } from "./mockCompanies";
import { cn } from "../../utils/cn";

const WeeklyCompanyPage : React.FC = () => {
  const [search, setSearch] = React.useState("");
  const [, setCompanies] = React.useState<Company[]>(MOCK_COMPANIES);

  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const metrics: DailySummaryMetric[] = [
    { id: "jobs", label: "Total Jobs", value: "04" },
    { id: "workCost", label: "Total Work Cost", value: "£0.00" },
    { id: "materials", label: "Total Materials", value: "£0.00" },
    { id: "techPay", label: "Total Tech Pay", value: "£0.00" },
    { id: "coPay", label: "Total Co. Pay", value: "£0.00" },
    { id: "profit", label: "Total Profit", value: "£0.00" },
  ];

  const rows: PaymentProfileRow[] = [
    {
      id: "r-1",
      locksmithName: "TS6 6UD",
      initials: "-",
      salaryProfile: "Card Payment",
      jobs: 1,
      workCost: "£0.00",
      techPay: "£0.00",
    },
    {
      id: "r-2",
      locksmithName: "TS6 6UD",
      initials: "-",
      salaryProfile: "Card Payment",
      jobs: 1,
      workCost: "£0.00",
      techPay: "£0.00",
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
      <h1 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
        Weekly Company
      </h1>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <CompanyListToolbar
            search={search}
            onSearchChange={setSearch}
            onNewCompany={handleNewCompany}
            placeholder="Search here"
            buttonLabel="+ New Company"
          />
        </div>

        {/* Export PDF button for larger screens - matches black pill in UI */}
        <button
          type="button"
          className={cn(
            "hidden h-11 items-center rounded-2xl bg-black px-5 text-sm font-semibold text-white",
            "hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700/40",
            "sm:inline-flex"
          )}
        >
          ⟳ Export PDF Report
        </button>
      </div>

      {/* All Companies section */}
      <div className="mt-4 rounded-3xl bg-[#f5f5f6] px-4 py-3 shadow-inner">
        <div className="text-sm font-semibold text-gray-900">
          All Companies
        </div>
        <div className="mt-1 text-xs text-gray-500">{periodLabel}</div>

        {/* summary cards */}
        <DailyCompanySummary metrics={metrics} />

        {/* first payment profile */}
        <PaymentProfileTable
          title="PAYMENT PROFILE : 50% | Jobs: 1"
          rows={rows}
          totalCompanyPay="£0.00"
          platformProfit="£0.00"
        />

        {/* second payment profile (demo copy, in real app you'd map different profiles) */}
        <PaymentProfileTable
          title="PAYMENT PROFILE : 50% | Jobs: 1"
          rows={rows}
          totalCompanyPay="£0.00"
          platformProfit="£0.00"
        />
      </div>

      {/* new company slide-over */}
      <SlideOver
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        widthClassName="max-w-sm"
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

export default WeeklyCompanyPage;
