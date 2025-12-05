import React from "react";
import {
  NavLink,
  useLocation,
  matchPath,
  useNavigate,
} from "react-router-dom";
import {
  sidebarItems,
  type SidebarSectionItem,
} from "../../../config/sidebarItems";
import type { IconType } from "react-icons";
import { FiChevronDown, FiChevronUp, FiLogOut } from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(
    {}
  );
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  React.useEffect(() => {
    const current: Record<string, boolean> = {};
    sidebarItems.forEach((item) => {
      if (item.type === "section") {
        current[item.label] = item.children.some((child) =>
          !!matchPath({ path: child.path, end: false }, location.pathname)
        );
      }
    });
    setOpenSections((prev) => ({ ...prev, ...current }));
  }, [location.pathname]);

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const renderIcon = (Icon?: IconType) =>
    Icon ? <Icon className="mr-3 h-4 w-4 flex-shrink-0" /> : null;

  const baseLinkClasses =
    "flex items-center px-3 py-2 text-[13px] rounded-md transition-colors cursor-pointer";
  const activeClasses = "bg-blue-50 text-blue-600 font-medium";
  const inactiveClasses =
    "text-gray-700 hover:bg-gray-100 hover:text-gray-900";

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    onClose();
    // Replace with real logout logic (clear tokens, etc.) when available
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* mobile backdrop */}
      <div
        className={`fixed inset-0 z-[1000] bg-black/30 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-[1100] flex w-64 flex-col border-r border-gray-200 bg-white transition-transform md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-14 items-center border-b border-gray-100 px-4">
  <div className="flex items-center gap-2">
    <img
      src="/images/logo.png"
      alt="sync mobile logo"
      className="h-8 w-30 rounded-lg "
    />
  </div>
</div>


        {/* Overview label */}
        <div className="px-4 pt-3 text-[11px] uppercase tracking-wide text-gray-400">
          Overview
        </div>

        {/* Nav items */}
        <nav className="mt-2 flex-1 overflow-y-auto px-2 pb-4">
          <ul className="space-y-1">
            {sidebarItems.map((item) =>
              item.type === "link" ? (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      [
                        baseLinkClasses,
                        isActive ? activeClasses : inactiveClasses,
                      ].join(" ")
                    }
                  >
                    {renderIcon(item.icon)}
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ) : (
                <SidebarSection
                  key={item.label}
                  section={item}
                  isOpen={!!openSections[item.label]}
                  toggle={() => toggleSection(item.label)}
                  onLinkClick={onClose}
                  currentPath={location.pathname}
                />
              )
            )}
          </ul>
        </nav>

        {/* Logout */}
        <button
          type="button"
          onClick={() => setShowLogoutConfirm(true)}
          className="flex items-center gap-2 border-t border-gray-100 px-4 py-3 text-[13px] text-red-500 hover:bg-red-50"
        >
          <FiLogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </aside>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl shadow-slate-400/30">
            <h3 className="text-lg font-semibold text-gray-900">Log out?</h3>
            <p className="mt-2 text-sm text-gray-600">
              You will be returned to the login page.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface SidebarSectionProps {
  section: SidebarSectionItem;
  isOpen: boolean;
  toggle: () => void;
  onLinkClick: () => void;
  currentPath: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  section,
  isOpen,
  toggle,
  onLinkClick,
  currentPath,
}) => {
  const hasActiveChild = section.children.some((child) =>
    !!matchPath({ path: child.path, end: false }, currentPath)
  );

  const baseLinkClasses =
    "flex items-center px-3 py-2 text-[13px] rounded-md transition-colors cursor-pointer";
  const activeClasses = "bg-blue-50 text-blue-600 font-medium";
  const inactiveClasses =
    "text-gray-700 hover:bg-gray-100 hover:text-gray-900";

  const Icon = section.icon;

  return (
    <li>
      <button
        type="button"
        onClick={toggle}
        className={[
          baseLinkClasses,
          hasActiveChild ? activeClasses : inactiveClasses,
          "w-full justify-between",
        ].join(" ")}
      >
        <span className="flex items-center">
          {Icon && <Icon className="mr-3 h-4 w-4 flex-shrink-0" />}
          <span>{section.label}</span>
        </span>
        {isOpen ? (
          <FiChevronUp className="h-4 w-4" />
        ) : (
          <FiChevronDown className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <ul className="mt-1 space-y-[2px] border-l border-gray-100 pl-4">
          {section.children.map((child) => (
            <li key={child.path}>
              <NavLink
                to={child.path}
                onClick={onLinkClick}
                className={({ isActive }) =>
                  [
                    "flex items-center px-3 py-[6px] text-[13px] rounded-md transition-colors cursor-pointer",
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  ].join(" ")
                }
              >
                {child.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Sidebar;
