import React from "react";
import PageContainer from "../../components/shared/layout/PageContainer";
import ReportsFilterBar from "../../components/reports/shared/ReportsFilterBar";
import SectionCard from "../../components/reports/shared/SectionCard";
import MetricCardGrid, {
  type MetricItem,
} from "../../components/reports/shared/MetricCardGrid";
import LocksmithTable, {
  type LocksmithRow,
} from "../../components/reports/locksmiths/LocksmithTable";

const DailyLocksmithsPage: React.FC = () => {
  const [dateLabel] = React.useState("October 23, 2025");
  const [entity, setEntity] = React.useState("All Locksmiths");

  const metrics: MetricItem[] = [
    { id: "completed", label: "Completed", value: "04" },
    { id: "cancelled", label: "Cancelled", value: "04" },
    { id: "appointments", label: "Appointments", value: "00" },
    { id: "work", label: "Work", value: "£0.00" },
    { id: "matRem", label: "Mat Remburs..", value: "£0.00" },
    { id: "matCum", label: "Mat Cumulated", value: "£0.00" },
    { id: "cash", label: "Cash", value: "£0.00" },
    { id: "credit", label: "Credit", value: "£0.00" },
    { id: "vat", label: "V.A.T", value: "£0.00" },
    { id: "techPay", label: "Tech Pay", value: "£0.00" },
    { id: "cashDiff", label: "Cash Difference", value: "- £0.00" },
  ];

  const rows: LocksmithRow[] = [
    {
      id: "1",
      postcode: "TS6 6UD",
      invoice: "SN25-3344",
      authNo: "Card Payment",
      workCost: "£0.00",
      matReimbursable: "£0.00",
      matCumulated: "£0.00",
      payType: "Cash",
      cash: "£0.00",
      credit: "£0.00",
      vat: "£0.00",
    },
    {
      id: "2",
      postcode: "TS6 6UD",
      invoice: "SN25-3344",
      authNo: "Card Payment",
      workCost: "£0.00",
      matReimbursable: "£0.00",
      matCumulated: "£0.00",
      payType: "Cash",
      cash: "£0.00",
      credit: "£0.00",
      vat: "£0.00",
    },
  ];

  return (
    <PageContainer fullWidth>
      <h1 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
        Daily Locksmiths
      </h1>

      <ReportsFilterBar
        dateLabel={dateLabel}
        entityLabel={entity}
        entityOptions={["All Locksmiths"]}
        onEntityChange={setEntity}
      />

      <SectionCard title="Daily Locksmith Report">
        <MetricCardGrid metrics={metrics} columns={3} />
      </SectionCard>

      <LocksmithTable title="Z1Z1" totalJobs={4} rows={rows} />
    </PageContainer>
  );
};

export default DailyLocksmithsPage;
