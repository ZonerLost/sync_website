import React from "react";
import PageContainer from "../../components/shared/layout/PageContainer";
import ReportsFilterBar from "../../components/reports/shared/ReportsFilterBar";
import CancelledJobCard, {
  type CancelledJob,
} from "../../components/reports/cancelled/CancelledJobCard";

const WeeklyCancelledPage: React.FC = () => {
  const [dateLabel] = React.useState("October 23 - October 30, 2025");
  const [entity, setEntity] = React.useState("All Operators");

  const jobs: CancelledJob[] = new Array(5).fill(null).map((_, idx) => ({
    id: String(idx + 1),
    title: "EN1 2RR",
    phone: "+1 (67) 457575 56",
    reason: "Quote",
    address: "Anne Heart Cl, Chafford Hundred , Grey RM16 6EM",
    cancelledLabel: "Cancelled on Nov 03, 2025 | 12:00 PM",
    instructions: "Lock problem 49 + vat if simple parts np 45 mins",
  }));

  return (
    <PageContainer fullWidth>
      <h1 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
        Weekly Cancelled
      </h1>

      <ReportsFilterBar
        dateLabel={dateLabel}
        entityLabel={entity}
        entityOptions={["All Operators"]}
        onEntityChange={setEntity}
      />

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
          <CancelledJobCard key={job.id} job={job} />
        ))}
      </div>
    </PageContainer>
  );
};

export default WeeklyCancelledPage;
