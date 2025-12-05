import React from "react";
import PageContainer from "../../components/shared/layout/PageContainer";
import SearchJobsToolbar from "../../components/searchJobs/SearchJobsToolbar";
import SearchJobListItem from "../../components/searchJobs/SearchJobListItem";
import SlideOver from "../../components/shared/overlay/SlideOver";
import JobDetailsPanel from "../../components/searchJobs/JobDetailsPanel";
import ConfirmDialog from "../../components/shared/overlay/ConfirmDialog";
import type { JobDetails } from "../../models/jobDetails";
import { MOCK_SEARCH_JOBS } from "./mockSearchJobs";

const SearchJobsPage: React.FC = () => {
  const [companyName, setCompanyName] = React.useState("");
  const [postCode, setPostCode] = React.useState("");

  const [allJobs, setAllJobs] = React.useState<JobDetails[]>(MOCK_SEARCH_JOBS);
  const [filteredJobs, setFilteredJobs] = React.useState<JobDetails[]>(MOCK_SEARCH_JOBS);

  const [selectedJob, setSelectedJob] = React.useState<JobDetails | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  const [jobToDelete, setJobToDelete] = React.useState<JobDetails | null>(null);

  // simple client-side filter
  const handleSearch = () => {
    const nameQ = companyName.trim().toLowerCase();
    const postQ = postCode.trim().toLowerCase();

    const next = allJobs.filter((job) => {
      const matchesName = !nameQ || job.companyName.toLowerCase().includes(nameQ);
      const matchesPost = !postQ || job.postcode.toLowerCase().includes(postQ);
      return matchesName && matchesPost;
    });

    setFilteredJobs(next);
  };

  const handleOpenDetails = (job: JobDetails) => {
    setSelectedJob(job);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedJob(null);
  };

  const handleDeleteJobClick = () => {
    if (!selectedJob) return;
    setJobToDelete(selectedJob);
  };

  const handleConfirmDelete = () => {
    if (!jobToDelete) return;

    const id = jobToDelete.id;
    const nextAll = allJobs.filter((job) => job.id !== id);
    setAllJobs(nextAll);
    setFilteredJobs((prev) => prev.filter((job) => job.id !== id));

    setJobToDelete(null);
    handleCloseDetails();
  };

  const handleCancelDelete = () => {
    setJobToDelete(null);
  };

  return (
    <PageContainer fullWidth>
      {/* page title */}
      <h1 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">
        Search Jobs
      </h1>

      {/* search bar */}
      <SearchJobsToolbar
        companyName={companyName}
        postCode={postCode}
        onCompanyNameChange={setCompanyName}
        onPostCodeChange={setPostCode}
        onSubmit={handleSearch}
      />

      {/* results */}
      <div className="mt-4">
        <div className="mb-2 text-xs text-gray-500">
          {filteredJobs.length} jobs found
        </div>

        <div>
          {filteredJobs.map((job) => (
            <SearchJobListItem
              key={job.id}
              job={job}
              onClick={() => handleOpenDetails(job)}
            />
          ))}

          {filteredJobs.length === 0 && (
            <div className="rounded-3xl bg-white px-4 py-8 text-center text-xs text-gray-400 shadow-sm">
              No jobs match your filters.
            </div>
          )}
        </div>
      </div>

      {/* slide-over job details */}
      <SlideOver
        isOpen={isDetailsOpen && !!selectedJob}
        onClose={handleCloseDetails}
        widthClassName="max-w-md"
      >
        {selectedJob && (
          <JobDetailsPanel
            job={selectedJob}
            onClose={handleCloseDetails}
            onDeleteClick={handleDeleteJobClick}
          />
        )}
      </SlideOver>

      {/* delete confirm modal */}
      <ConfirmDialog
        open={!!jobToDelete}
        title="Delete this job?"
        description={
          jobToDelete
            ? `Are you sure you want to delete job ${jobToDelete.jobNumber} at ${jobToDelete.postcode}?`
            : ""
        }
        confirmLabel="Delete job"
        cancelLabel="Keep job"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </PageContainer>
  );
};

export default SearchJobsPage;
