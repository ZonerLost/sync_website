import React, { useMemo, useState } from "react";
import WeeklyCompaniesOutFilters, {
  type WeeklyCompaniesOutFilterValue,
} from "../../components/reports/weekly-companies-out/WeeklyCompaniesOutFilters";
import WeeklyCompaniesOutTable, {
  type WeeklyCompanyOutItem,
} from "../../components/reports/weekly-companies-out/WeeklyCompaniesOutTable";
import WeeklyCompanyOutDetailsDrawer from "../../components/reports/weekly-companies-out/WeeklyCompanyOutDetailsDrawer";

const todayISO = () => new Date().toISOString().slice(0, 10);

const WeeklyCompaniesOutPage: React.FC = () => {
  const [filters, setFilters] = useState<WeeklyCompaniesOutFilterValue>({
    startDate: todayISO(),
    endDate: todayISO(),
    operatorId: "all",
  });

  const [loading, setLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const [selected, setSelected] = useState<WeeklyCompanyOutItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Mock data (replace with API)
  const allItems: WeeklyCompanyOutItem[] = useMemo(
    () => [
      {
        id: "co-1",
        companyName: "A Locksmith - Supreme",
        operatorName: "ZIZ1",
        postCode: "TS6 6UD",
        jobsOut: 3,
        periodLabel: "Oct 23 - Oct 30, 2025",
        status: "active",
      },
      {
        id: "co-2",
        companyName: "Comin Dispatch",
        operatorName: "OVIDIUSN/GL",
        postCode: "RM16 6EM",
        jobsOut: 5,
        periodLabel: "Oct 23 - Oct 30, 2025",
        status: "active",
      },
    ],
    []
  );

  const items = useMemo(() => {
    if (!hasRun) return [];
    if (filters.operatorId === "all") return allItems;
    return allItems.filter((i) => i.operatorName === filters.operatorId);
  }, [hasRun, filters.operatorId, allItems]);

  const handleRun = async () => {
    setLoading(true);
    try {
      // Later: call backend
      setHasRun(true);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (item: WeeklyCompanyOutItem) => {
    setSelected(item);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">
          Weekly Companies OUT
        </h1>
      </div>

      <WeeklyCompaniesOutFilters
        value={filters}
        onChange={setFilters}
        onRun={handleRun}
        loading={loading}
      />

      {!hasRun ? (
        <div className="rounded-2xl bg-white p-10 text-center">
          <div className="text-sm text-gray-500">
            Select filters and click{" "}
            <span className="font-medium">Show report</span>.
          </div>
        </div>
      ) : (
        <WeeklyCompaniesOutTable items={items} onOpenDetails={openDetails} />
      )}

      <WeeklyCompanyOutDetailsDrawer
        open={drawerOpen}
        item={selected}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default WeeklyCompaniesOutPage;
