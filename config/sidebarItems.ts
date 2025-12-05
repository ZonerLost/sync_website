import type { IconType } from "react-icons";
import {
  FiHome,
  FiSearch,
  FiUsers,
  FiFileText,
  FiSettings,
  FiUser,
} from "react-icons/fi";

export type SidebarLinkItem = {
  type: "link";
  label: string;
  path: string;
  icon?: IconType;
};

export type SidebarSectionItem = {
  type: "section";
  label: string;
  icon?: IconType;
  children: SidebarLinkItem[];
};

export type SidebarItem = SidebarLinkItem | SidebarSectionItem;

export const sidebarItems: SidebarItem[] = [
  {
    type: "link",
    label: "Dashboard",
    path: "/dashboard",
    icon: FiHome,
  },
  {
    type: "link",
    label: "Search Jobs",
    path: "/jobs/search",
    icon: FiSearch,
  },
  {
    type: "section",
    label: "Company Report",
    icon: FiUsers,
    children: [
      { type: "link", label: "Company List", path: "/company/list" },
      { type: "link", label: "Daily Company", path: "/company/daily" },
      { type: "link", label: "Weekly Company", path: "/company/weekly" },
    ],
  },
  {
    type: "section",
    label: "Reports",
    icon: FiFileText,
    children: [
      { type: "link", label: "Daily Locksmiths", path: "/reports/daily-locksmiths" },
      { type: "link", label: "Weekly Locksmiths", path: "/reports/weekly-locksmiths" },
      { type: "link", label: "Weekly Cancelled", path: "/reports/weekly-cancelled" },
      { type: "link", label: "Weekly Companies IN", path: "/reports/weekly-companies-in" },
      { type: "link", label: "Weekly Companies OUT", path: "/reports/weekly-companies-out" },
      { type: "link", label: "Daily Operators", path: "/reports/daily-operators" },
      { type: "link", label: "Weekly Operators", path: "/reports/weekly-operators" },
      { type: "link", label: "Monthly Operators", path: "/reports/monthly-operators" },
      { type: "link", label: "Locksmith Revenue", path: "/reports/locksmith-revenue" },
    ],
  },
  {
    type: "section",
    label: "Management",
    icon: FiSettings,
    children: [
     
      { type: "link", label: "View Locksmiths", path: "/management/view-locksmiths" },
      { type: "link", label: "View Operators", path: "/management/view-operators" },
      { type: "link", label: "View Accountants", path: "/management/view-accountants" },
      { type: "link", label: "Companies", path: "/management/companies" },
      { type: "link", label: "Email Addresses", path: "/management/email-addresses" },
    ],
  },
  {
    type: "link",
    label: "User Profile",
    path: "/profile",
    icon: FiUser,
  },
];
