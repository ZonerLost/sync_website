import React from "react";
import PageContainer from "../../components/shared/layout/PageContainer";
import ReportsFilterBar from "../../components/reports/shared/ReportsFilterBar";
import LocksmithRevenueTable, {
  type RevenueRow,
} from "../../components/reports/revenue/LocksmithRevenueTable";

const LocksmithRevenuePage: React.FC = () => {
  const [dateLabel] = React.useState("October 23 - October 30, 2025");
  const [entity, setEntity] = React.useState("All Operators");

  const rows: RevenueRow[] = [
    {
      id: "1",
      name: "Dan Taste",
      since: "Oct 05, 2025",
      jobs: 17,
      cancelled: 2,
      avgJob: "£0.00",
      revenue: "£0.00",
      matReimbursable: "£0.00",
      matCumulated: "£0.00",
      vat: "£0.00",
      techPay: "£0.00",
    },
    {
      id: "2",
      name: "Ovidiu Bedenci",
      since: "Oct 05, 2025",
      jobs: 0,
      cancelled: 0,
      avgJob: "£0.00",
      revenue: "£0.00",
      matReimbursable: "£0.00",
      matCumulated: "£0.00",
      vat: "£0.00",
      techPay: "£0.00",
    },
    {
      id: "3",
      name: "Z1Z1",
      since: "Oct 05, 2025",
      jobs: 34,
      cancelled: 0,
      avgJob: "£0.00",
      revenue: "£0.00",
      matReimbursable: "£0.00",
      matCumulated: "£0.00",
      vat: "£0.00",
      techPay: "£0.00",
    },
    {
      id: "4",
      name: "Ovidiu Bedenci",
      since: "Oct 05, 2025",
      jobs: 0,
      cancelled: 0,
      avgJob: "£0.00",
      revenue: "£0.00",
      matReimbursable: "£0.00",
      matCumulated: "£0.00",
      vat: "£0.00",
      techPay: "£0.00",
    },
  ];

  return (
    <PageContainer fullWidth>
      <h1 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
        Locksmith Revenue
      </h1>

      <ReportsFilterBar
        dateLabel={dateLabel}
        entityLabel={entity}
        entityOptions={["All Operators"]}
        onEntityChange={setEntity}
      />

      <LocksmithRevenueTable rows={rows} />
    </PageContainer>
  );
};

export default LocksmithRevenuePage;
