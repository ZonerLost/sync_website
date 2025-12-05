import React, { useMemo, useState } from "react";
import WeeklyCompaniesInFilters, {
  type WeeklyCompaniesInFilterValue,
} from "../../components/reports/weekly-companies-in/WeeklyCompaniesInFilters";
import WeeklyCompaniesInTable, {
  type WeeklyCompanyInItem,
} from "../../components/reports/weekly-companies-in/WeeklyCompaniesInTable";
import WeeklyCompanyInDetailsDrawer from "../../components/reports/weekly-companies-in/WeeklyCompanyInDetailsDrawer";

const todayISO = () => new Date().toISOString().slice(0, 10);

const WeeklyCompaniesInPage: React.FC = () => {
  const [filters, setFilters] = useState<WeeklyCompaniesInFilterValue>({
    startDate: todayISO(),
    endDate: todayISO(),
    operatorId: "all",
  });

  const [loading, setLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const [selected, setSelected] = useState<WeeklyCompanyInItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Mock data (replace with API later)
  const allItems: WeeklyCompanyInItem[] = useMemo(
    () => [
      {
        id: "c1",
        companyName: "A Locksmith - Supreme",
        operatorName: "ZIZ1",
        postCode: "TS6 6UD",
        jobsIn: 12,
        periodLabel: "Oct 23 - Oct 30, 2025",
        status: "active",
      },
      {
        id: "c2",
        companyName: "Comin Dispatch",
        operatorName: "OVIDIUSN/GL",
        postCode: "RM16 6EM",
        jobsIn: 7,
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
      // Later: call backend with filters
      // await api.get("/reports/weekly-companies-in", { params: filters });
      setHasRun(true);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (item: WeeklyCompanyInItem) => {
    setSelected(item);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-5">
      {/* Title */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">
          Weekly Companies IN
        </h1>
      </div>

      {/* Filters row */}
      <WeeklyCompaniesInFilters
        value={filters}
        onChange={setFilters}
        onRun={handleRun}
        loading={loading}
      />

      {/* Body */}
      {!hasRun ? (
        <div className="rounded-2xl bg-white p-10 text-center">
          <div className="text-sm text-gray-500">
            Select filters and click <span className="font-medium">Show report</span>.
          </div>
        </div>
      ) : (
        <WeeklyCompaniesInTable items={items} onOpenDetails={openDetails} />
      )}

      {/* Details drawer (modal flow) */}
      <WeeklyCompanyInDetailsDrawer
        open={drawerOpen}
        item={selected}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default WeeklyCompaniesInPage;
