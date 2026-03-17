import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f5f9]">
        <p className="text-sm text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!auth.isAuthenticated || !auth.token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;