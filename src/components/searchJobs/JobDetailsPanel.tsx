import React from "react";
import type { JobDetails } from "../../models/jobDetails";
import { FiX } from "react-icons/fi";
import { cn } from "../../utils/cn";

interface JobDetailsPanelProps {
  job: JobDetails;
  onClose: () => void;
  onDeleteClick: () => void;
}

const JobDetailsPanel: React.FC<JobDetailsPanelProps> = ({
  job,
  onClose,
  onDeleteClick,
}) => {
  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-4 shadow-md">
      {/* header with close button */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            onClick={onClose}
          >
            <FiX className="h-4 w-4" />
          </button>
          <h2 className="text-sm font-semibold text-gray-900">
            Job Details
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-1 pb-2">
        {/* Top summary */}
        <div className="rounded-3xl bg-[#f7f7f8] px-4 py-4 text-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-base font-semibold text-gray-900">
                {job.zoneCode}
              </div>
              <div className="mt-0.5 text-[11px] text-gray-500">
                Date &amp; Time :{" "}
                <span className="text-gray-800">{job.dateTimeLabel}</span>
              </div>
            </div>
            <div className="text-sm font-semibold text-blue-600">
              {job.jobNumber}
            </div>
          </div>

          {/* Email / phone */}
          <div className="mt-4 grid grid-cols-1 gap-3 text-[11px] text-gray-500 sm:grid-cols-2">
            <div>
              <div>Email address</div>
              <div className="mt-0.5 font-semibold text-gray-800">
                {job.email}
              </div>
            </div>
            <div>
              <div>Phone number</div>
              <div className="mt-0.5 font-semibold text-gray-800">
                {job.phone}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              className="rounded-full bg-white px-3 py-2 font-semibold text-gray-800 shadow-sm hover:bg-gray-50"
            >
              View Pictures
            </button>
            <button
              type="button"
              className="rounded-full bg-amber-400 px-3 py-2 font-semibold text-white shadow-sm hover:bg-amber-500"
            >
              Edit Job
            </button>
            <button
              type="button"
              className={cn(
                "rounded-full bg-rose-500 px-3 py-2 font-semibold text-white shadow-sm hover:bg-rose-600"
              )}
              onClick={onDeleteClick}
            >
              Delete Job
            </button>
          </div>
        </div>

        {/* NOTES */}
        <Section title="Notes">
          <RowLabelValue
            label="Mat Rembursable"
            value={job.matRembursable}
            isLink
          />
          <RowLabelValue
            label="Job description"
            value={job.jobDescription}
            isLink
          />
        </Section>

        {/* Operators on shift */}
        <Section title="Operators on Shift">
          <div className="overflow-hidden rounded-2xl border border-gray-100 text-xs">
            <div className="grid grid-cols-3 bg-gray-50 px-3 py-2 font-medium text-gray-600">
              <div>Operator</div>
              <div>Date</div>
              <div>Time</div>
            </div>
            {job.operatorsOnShift.map((op, idx) => (
              <div
                key={idx}
                className="grid grid-cols-3 border-t border-gray-100 px-3 py-2 text-[11px] text-gray-800"
              >
                <div>{op.name}</div>
                <div>{op.date}</div>
                <div>{op.time}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* INFO sections */}
        <Section title="Info">
          <RowLabelValue
            label="Completed by"
            value={job.completedBy}
            isLink
          />
          <RowLabelValue label="Date & Time" value={job.completedAt} />
        </Section>

        <Section title="Info">
          <RowLabelValue label="Work Cost" value={job.workCost} />
          <RowLabelValue
            label="Mat Rembursable"
            value={job.matRembursableAmount}
          />
          <RowLabelValue label="Mat Cumulated" value={job.matCumulated} />
        </Section>

        <Section title="Info">
          <RowLabelValue label="Payment Type" value={job.paymentType} />
          <RowLabelValue label="Cash" value={job.cash} />
          <RowLabelValue label="V.A.T" value={job.vat} />
          <RowLabelValue label="Credit" value={job.credit} />
        </Section>

        <Section title="Info">
          <RowLabelValue
            label="Invoice no"
            value={job.invoiceNo}
            isLink
          />
          <RowLabelValue
            label="Authorize no"
            value={job.authorizeNo}
            isLink
          />
        </Section>
      </div>
    </div>
  );
};

export default JobDetailsPanel;

// ---------- small helpers ----------

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="mt-4 rounded-3xl bg-[#f7f7f8] px-4 py-3 text-xs">
    <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
      {title}
    </div>
    {children}
  </div>
);

interface RowProps {
  label: string;
  value: string;
  isLink?: boolean;
}

const RowLabelValue: React.FC<RowProps> = ({ label, value, isLink }) => (
  <div className="mb-1 flex flex-wrap justify-between gap-1 text-[11px] text-gray-600 last:mb-0">
    <span>{label}</span>
    <span
      className={cn(
        "font-semibold",
        isLink ? "cursor-pointer text-blue-600 hover:underline" : "text-gray-800"
      )}
    >
      {value}
    </span>
  </div>
);
