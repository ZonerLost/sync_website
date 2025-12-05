import type { Job } from "../../models/job";

export const MOCK_JOBS: Job[] = [
  // --- OPEN ---
  {
    id: "job-open-1",
    status: "open",
    postcode: "EN1 2RR",
    zoneCode: "Z1Z1",
    operatorName: "COSMIN Operator",
    scheduledAt: "Nov 23, 2025 | 12:00 PM",
    instructions: "Lock problem 49 + VAT if simple parts up 45 mins",
  },
  {
    id: "job-open-2",
    status: "open",
    postcode: "EN1 2RR",
    zoneCode: "Z1Z1",
    operatorName: "COSMIN Operator",
    scheduledAt: "Nov 23, 2025 | 12:00 PM",
    instructions: "Lock problem 49 + VAT if simple parts up 45 mins",
  },

  // --- COMPLETED ---
  {
    id: "job-completed-1",
    status: "completed",
    postcode: "RM15 4YE",
    zoneCode: "R",
    operatorName: "Z1Z1",
    scheduledAt: "Oct 23, 2025 | 12:00 PM",
    price: 2000,
  },
  {
    id: "job-completed-2",
    status: "completed",
    postcode: "RM15 4YE",
    zoneCode: "R",
    operatorName: "Z1Z1",
    scheduledAt: "Oct 23, 2025 | 12:00 PM",
    price: 2000,
  },
  {
    id: "job-completed-3",
    status: "completed",
    postcode: "RM15 4YE",
    zoneCode: "R",
    operatorName: "Z1Z1",
    scheduledAt: "Oct 23, 2025 | 12:00 PM",
    price: 2000,
  },

  // --- ON HOLD ---
  {
    id: "job-hold-1",
    status: "onHold",
    postcode: "EN1 2RR",
    zoneCode: "Z1Z1",
    operatorName: "COSMIN Operator",
    scheduledAt: "Nov 05, 2025 | 12:00 PM",
    addedBy: "Laurentiu Operator",
    onHoldBy: "OVIDIU SN / GL",
    instructions: "On Hold waiting for payment",
  },
  {
    id: "job-hold-2",
    status: "onHold",
    postcode: "EN1 2RR",
    zoneCode: "Z1Z1",
    operatorName: "COSMIN Operator",
    scheduledAt: "Nov 05, 2025 | 12:00 PM",
    addedBy: "Laurentiu Operator",
    onHoldBy: "OVIDIU SN / GL",
    instructions: "On Hold waiting for payment",
  },

  // --- APPOINTMENTS ---
  {
    id: "job-app-1",
    status: "appointments",
    postcode: "EN1 2RR",
    zoneCode: "Z1Z1",
    operatorName: "COSMIN Operator",
    scheduledAt: "Nov 25, 2025 | 10:00 AM",
    instructions: "Lock problem – appointment booked",
  },

  // --- CANCELLED ---
  {
    id: "job-cancelled-1",
    status: "cancelled",
    postcode: "EN1 2RR",
    zoneCode: "Z1Z1",
    operatorName: "COSMIN Operator",
    scheduledAt: "Nov 20, 2025 | 3:30 PM",
    instructions: "Cancelled by customer",
  },
];
