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

const WeeklyLocksmithsPage: React.FC = () => {
  const [dateLabel] = React.useState("October 23 - October 30, 2025");
  const [entity, setEntity] = React.useState("All Locksmiths");

  const metrics: MetricItem[] = [
    { id: "completed", label: "Completed", value: "04" },
    { id: "cancelled", label: "Cancelled", value: "04" },
    { id: "onhold", label: "On Hold", value: "00" },
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
        Weekly Locksmiths
      </h1>

      <ReportsFilterBar
        dateLabel={dateLabel}
        entityLabel={entity}
        entityOptions={["All Locksmiths"]}
        onEntityChange={setEntity}
      />

      <SectionCard title="Weekly Locksmith Report">
        <MetricCardGrid metrics={metrics} columns={3} />
      </SectionCard>

      <LocksmithTable title="OVIDIU SN/GL" totalJobs={4} rows={rows} />
    </PageContainer>
  );
};

export default WeeklyLocksmithsPage;
