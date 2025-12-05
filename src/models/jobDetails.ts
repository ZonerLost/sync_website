import type { JobStatus } from "./job";

export interface OperatorShift {
  name: string;
  date: string;
  time: string;
}

export interface JobDetails {
  id: string;
  status: JobStatus;
  postcode: string;       // e.g. "TS6 6UD"
  companyName: string;    // company display name
  completedAt: string;    // "Oct 23, 2025 | 12:00 PM"
  completedBy: string;    // "Z1Z1"
  invoiceNo: string;      // "SN25-54454"

  // detail panel fields
  jobNumber: string;      // "#44"
  zoneCode: string;       // e.g. "SW2"
  dateTimeLabel: string;  // "As soon as possible"
  email: string;
  phone: string;

  matRembursable: string;
  jobDescription: string;

  operatorsOnShift: OperatorShift[];

  workCost: string;
  matRembursableAmount: string;
  matCumulated: string;

  paymentType: string;
  cash: string;
  vat: string;
  credit: string;

  authorizeNo: string;
}
