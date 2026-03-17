import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import PlaceholderPage from "../pages/PlaceholderPage";
import { useAuth } from "../context/AuthContext";

import DashboardPage from "../pages/dashboard/DashboardPage";
import SearchJobsPage from "../pages/search-jobs/SearchJobsPage";
import UserProfilePage from "../pages/user-profile/UserProfilePage";
import NotificationsPage from "../pages/notifications/NotificationsPage";

import CompanyListPage from "../pages/company-report/CompanyListPage";
import DailyCompanyPage from "../pages/company-report/DailyCompanyPage";
import WeeklyCompanyPage from "../pages/company-report/WeeklyCompanyPage";
import CompaniesPage from "../pages/management/CompaniesPage";

import DailyLocksmithsPage from "../pages/reports/DailyLocksmithsPage";
import DailyOperatorsPage from "../pages/reports/DailyOperatorsPage";
import LocksmithRevenuePage from "../pages/reports/LocksmithRevenuePage";
import MonthlyOperatorsPage from "../pages/reports/MonthlyOperatorsPage";
import WeeklyCancelledPage from "../pages/reports/WeeklyCancelledPage";
import WeeklyLocksmithsPage from "../pages/reports/WeeklyLocksmithsPage";
import WeeklyOperatorsPage from "../pages/reports/WeeklyOperatorsPage";
import WeeklyCompaniesInPage from "../pages/reports/WeeklyCompaniesInPage";
import WeeklyCompaniesOutPage from "../pages/reports/WeeklyCompaniesOutPage";

import AccountantsPage from "../pages/management/AccountantsPage";
import EmailAddressesPage from "../pages/management/EmailAddressesPage";
import LocksmithsPage from "../pages/management/LocksmithsPage";
import OperatorsPage from "../pages/management/OperatorsPage";

import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ForgotPasswordSentPage from "../pages/auth/ForgotPasswordSentPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import RegisterPage from "../pages/auth/RegisterPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";

import ProtectedRoute from "../routes/ProtectedRoute";

const AuthAwareFallback: React.FC = () => {
  const { auth } = useAuth();

  if (!auth.isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f5f9]">
        <p className="text-sm text-slate-500">Loading...</p>
      </div>
    );
  }

  const isAuthenticated = auth.isAuthenticated && Boolean(auth.token);

  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/forgot-password/sent" element={<ForgotPasswordSentPage />} />
      {/* Backend reset email URL must target frontend:
          ${FRONTEND_URL}/reset-password/<token>
          or ${FRONTEND_URL}/reset-password?token=<token> */}
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      <Route path="/" element={<AuthAwareFallback />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/jobs/search" element={<SearchJobsPage />} />

          <Route path="/company/list" element={<CompanyListPage />} />
          <Route path="/company/daily" element={<DailyCompanyPage />} />
          <Route path="/company/weekly" element={<WeeklyCompanyPage />} />

          <Route
            path="/reports/daily-locksmiths"
            element={<DailyLocksmithsPage />}
          />
          <Route
            path="/reports/weekly-locksmiths"
            element={<WeeklyLocksmithsPage />}
          />
          <Route
            path="/reports/weekly-cancelled"
            element={<WeeklyCancelledPage />}
          />
          <Route
            path="/reports/weekly-companies-in"
            element={<WeeklyCompaniesInPage />}
          />
          <Route
            path="/reports/weekly-companies-out"
            element={<WeeklyCompaniesOutPage />}
          />
          <Route
            path="/reports/daily-operators"
            element={<DailyOperatorsPage />}
          />
          <Route
            path="/reports/weekly-operators"
            element={<WeeklyOperatorsPage />}
          />
          <Route
            path="/reports/monthly-operators"
            element={<MonthlyOperatorsPage />}
          />
          <Route
            path="/reports/locksmith-revenue"
            element={<LocksmithRevenuePage />}
          />

          <Route
            path="/management/add-locksmith"
            element={<PlaceholderPage title="Add Locksmiths" />}
          />
          <Route
            path="/management/view-locksmiths"
            element={<LocksmithsPage />}
          />
          <Route
            path="/management/add-operator"
            element={<PlaceholderPage title="Add Operators" />}
          />
          <Route
            path="/management/view-operators"
            element={<OperatorsPage />}
          />
          <Route
            path="/management/add-accountant"
            element={<PlaceholderPage title="Add Accountant" />}
          />
          <Route
            path="/management/view-accountants"
            element={<AccountantsPage />}
          />
          <Route path="/management/companies" element={<CompaniesPage />} />
          <Route
            path="/management/email-addresses"
            element={<EmailAddressesPage />}
          />

          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<AuthAwareFallback />} />
    </Routes>
  );
};

export default AppRoutes;
