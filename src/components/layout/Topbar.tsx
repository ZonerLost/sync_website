import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import { sidebarItems } from "../../../config/sidebarItems";
import { useMyProfile } from "../../hooks/userProfile/useMyProfile";

interface TopbarProps {
  onToggleSidebar: () => void;
}

type Crumb = { label: string; to?: string };

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: profile } = useMyProfile();

  const breadcrumbs = React.useMemo<Crumb[]>(() => {
    const path = location.pathname;
    const crumbs: Crumb[] = [];

    crumbs.push({ label: "Dashboard", to: "/dashboard" });

    if (path === "/dashboard") {
      return crumbs;
    }

    if (path === "/notifications") {
      crumbs.push({ label: "Notifications" });
      return crumbs;
    }

    for (const item of sidebarItems) {
      if (item.type === "section") {
        const child = item.children.find((c) => c.path === path);
        if (child) {
          crumbs.push({ label: item.label });
          crumbs.push({ label: child.label });
          return crumbs;
        }
      }
    }

    const linkItem = sidebarItems.find(
      (i) => i.type === "link" && i.path === path
    );

    if (linkItem && linkItem.label !== "Dashboard") {
      crumbs.push({ label: linkItem.label });
    }

    return crumbs;
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-gray-100 bg-white/95 px-3 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 md:hidden"
          onClick={onToggleSidebar}
        >
          <FiMenu className="h-5 w-5" />
        </button>

        <div className="flex items-center text-xs text-gray-500 sm:text-sm">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <React.Fragment key={`${crumb.label}-${index}`}>
                {index > 0 && <span className="mx-1">•</span>}
                {crumb.to && !isLast ? (
                  <Link
                    to={crumb.to}
                    className="hover:text-gray-700 hover:underline"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? "font-medium text-blue-600" : undefined}>
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-500 sm:flex">
          <input
            type="text"
            placeholder="Search here..."
            className="bg-transparent text-xs outline-none placeholder:text-gray-400"
          />
        </div>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          onClick={() => navigate("/notifications")}
          aria-label="View notifications"
        >
          <FiBell className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-2.5 py-1.5 text-xs hover:bg-gray-50"
        >
          <div className="h-7 w-7 overflow-hidden rounded-full bg-gray-300">
            {profile?.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={profile.fullName || "User avatar"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[11px] font-semibold text-white">
                {(profile?.fullName || "U").charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <span className="hidden text-[13px] font-medium text-gray-800 sm:inline">
            {profile?.fullName || "User"}
          </span>

          <FiChevronDown className="hidden h-3 w-3 text-gray-500 sm:inline" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;