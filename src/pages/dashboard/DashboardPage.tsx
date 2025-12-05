import React from "react";
import PageContainer from "../../components/shared/layout/PageContainer";
import MapContainer from "../../components/shared/maps/MapContainer";
import JobFiltersBar, {
  type JobCounts,
} from "../../components/dashboard/JobFiltersBar";
import type { Job, JobStatus } from "../../models/job";
import { MOCK_JOBS } from "./mockJobs";
import SlideOver from "../../components/shared/overlay/SlideOver";
import JobListPanel from "../../components/dashboard/JobListPanel";
import ConfirmDialog from "../../components/shared/overlay/ConfirmDialog";

const DashboardPage: React.FC = () => {
  const [jobs, setJobs] = React.useState<Job[]>(MOCK_JOBS);
  const [activeStatus, setActiveStatus] = React.useState<JobStatus>("open");
  const [isPanelOpen, setIsPanelOpen] = React.useState<boolean>(false);

  const [jobToCancel, setJobToCancel] = React.useState<Job | null>(null);

  // group jobs by status
  const jobsByStatus = React.useMemo(() => {
    const grouped: Record<JobStatus, Job[]> = {
      open: [],
      completed: [],
      onHold: [],
      appointments: [],
      cancelled: [],
    };
    for (const job of jobs) {
      grouped[job.status].push(job);
    }
    return grouped;
  }, [jobs]);

  const counts: JobCounts = {
    open: jobsByStatus.open.length,
    completed: jobsByStatus.completed.length,
    onHold: jobsByStatus.onHold.length,
    appointments: jobsByStatus.appointments.length,
    cancelled: jobsByStatus.cancelled.length,
  };

  const activeJobs = jobsByStatus[activeStatus];

  const handleStatusChange = (status: JobStatus) => {
    setActiveStatus(status);
    setIsPanelOpen(true);
  };

  const handleCancelJobClick = (job: Job) => {
    setJobToCancel(job);
  };

  const handleConfirmCancel = () => {
    if (!jobToCancel) return;
    const jobId = jobToCancel.id;

    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: "cancelled" } : job
      )
    );

    setJobToCancel(null);
    // optionally switch view to "Cancelled"
    // setActiveStatus("cancelled");
    // setIsPanelOpen(true);
  };

  const handleCancelDialogClose = () => {
    setJobToCancel(null);
  };

  return (
    <PageContainer fullWidth>
      {/* filter pills above map */}
      <div className="mb-3 md:mb-4">
        <JobFiltersBar
          activeStatus={activeStatus}
          counts={counts}
          onChange={handleStatusChange}
        />
      </div>

      {/* Map fills the rest */}
      <MapContainer />

      {/* Right slide-over with job list */}
      <SlideOver
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        widthClassName="max-w-sm"
      >
        <JobListPanel
          status={activeStatus}
          jobs={activeJobs}
          showHeaderClose
          onClose={() => setIsPanelOpen(false)}
          onCancelJobClick={handleCancelJobClick}
        />
      </SlideOver>

      {/* Cancel job confirm modal */}
      <ConfirmDialog
        open={!!jobToCancel}
        title="Cancel this job?"
        description={
          jobToCancel
            ? `Are you sure you want to cancel the job at ${jobToCancel.postcode}?`
            : ""
        }
        confirmLabel="Cancel job"
        cancelLabel="Keep job"
        onConfirm={handleConfirmCancel}
        onCancel={handleCancelDialogClose}
      />
    </PageContainer>
  );
};

export default DashboardPage;
