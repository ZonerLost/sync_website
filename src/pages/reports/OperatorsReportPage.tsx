import React from "react";
import PageContainer from "../../components/shared/layout/PageContainer";
import ReportsFilterBar from "../../components/reports/shared/ReportsFilterBar";
import OperatorCard, {
  type OperatorSummary,
} from "../../components/reports/operators/OperatorCard";
import SlideOver from "../../components/shared/overlay/SlideOver";
import OperatorJobsPanel, {
  type OperatorJob,
} from "../../components/reports/operators/OperatorJobsPanel";

type Variant = "daily" | "weekly" | "monthly";

interface OperatorsReportPageProps {
  variant: Variant;
}

const OperatorsReportPage: React.FC<OperatorsReportPageProps> = ({
  variant,
}) => {
  const titleMap: Record<Variant, string> = {
    daily: "Daily Operators",
    weekly: "Weekly Operators",
    monthly: "Monthly Operators",
  };

  const [dateLabel] = React.useState("October 23 - October 30, 2025");
  const [entity, setEntity] = React.useState("All Operators");

  const operators: OperatorSummary[] = new Array(5)
    .fill(null)
    .map((_, i) => ({
      id: String(i + 1),
      name: "Comin Operator",
      completedJobs: 14,
      cancelledJobs: 1,
    }));

  const [selectedOperator, setSelectedOperator] =
    React.useState<OperatorSummary | null>(null);
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);

  const openJobs = (op: OperatorSummary) => {
    setSelectedOperator(op);
    setIsPanelOpen(true);
  };

  const closeJobs = () => {
    setIsPanelOpen(false);
    setSelectedOperator(null);
  };

  const jobs: OperatorJob[] = new Array(5).fill(null).map((_, i) => ({
    id: String(i + 1),
    postcode: "RM15 4YE",
    operatorName: "Cosmin Operators",
    companyJob: "R Locksmith",
    status: "Completed",
    price: "$2,000.00",
    dateTime: "Oct 23, 2025 | 12:00 PM",
  }));

  const summaryLabel = "36 Completed Jobs | 12 Cancelled Jobs";

  return (
    <PageContainer fullWidth>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-lg font-semibold text-gray-900 md:text-xl">
            {titleMap[variant]}
          </h1>
          <div className="text-xs text-gray-500 sm:text-sm">{dateLabel}</div>
        </div>

        <ReportsFilterBar
          dateLabel={dateLabel}
          entityLabel={entity}
          entityOptions={["All Operators"]}
          onEntityChange={setEntity}
        />

        <div className="rounded-3xl bg-[#f5f5f6] px-4 py-2 text-xs font-semibold text-gray-800 ring-1 ring-black/5 sm:flex sm:items-center sm:justify-between">
          <span>{summaryLabel}</span>
          <span className="mt-1 text-[11px] text-gray-500 sm:mt-0">
            {entity}
          </span>
        </div>

        <div className="rounded-3xl bg-[#f5f5f6] px-4 pb-4 pt-3 shadow-inner sm:px-5 sm:pt-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {operators.map((op) => (
              <OperatorCard
                key={op.id}
                operator={op}
                onViewJobs={() => openJobs(op)}
              />
            ))}
          </div>
        </div>
      </div>

      <SlideOver
        isOpen={isPanelOpen}
        onClose={closeJobs}
        widthClassName="w-full sm:max-w-md lg:max-w-lg"
      >
        {selectedOperator && (
          <OperatorJobsPanel
            operatorName={selectedOperator.name}
            dateLabel={dateLabel}
            jobs={jobs}
            onClose={closeJobs}
          />
        )}
      </SlideOver>
    </PageContainer>
  );
};

export default OperatorsReportPage;
