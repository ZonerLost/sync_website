import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <main className="flex-1 p-3 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
