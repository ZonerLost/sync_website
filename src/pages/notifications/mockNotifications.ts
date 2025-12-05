import type { Notification } from "../../models/notification";

export const MOCK_NOTIFICATIONS: Notification[] = [
  // Today
  {
    id: "n-1",
    title: "Account Created!",
    body: "Your account has been created.",
    time: "12:33 am",
    dateLabel: "Today",
    initial: "A",
    variant: "success",
  },
  {
    id: "n-2",
    title: "Report Ready",
    body: "Lorem ipsum dolor ist amet contestesy",
    time: "12:33 am",
    dateLabel: "Today",
    initial: "D",
    variant: "warning",
  },
  {
    id: "n-3",
    title: "New Operator added",
    body: "Lorem ipsum dolor ist amet contestesy",
    time: "12:33 am",
    dateLabel: "Today",
    initial: "D",
    variant: "success",
  },
  // Yesterday
  {
    id: "n-4",
    title: "New Operator added",
    body: "Lorem ipsum dolor ist amet contestesy",
    time: "12:33 am",
    dateLabel: "Yesterday",
    initial: "D",
    variant: "success",
  },
  {
    id: "n-5",
    title: "Report Ready",
    body: "Lorem ipsum dolor ist amet contestesy",
    time: "12:33 am",
    dateLabel: "Yesterday",
    initial: "D",
    variant: "warning",
  },
];
