import React from "react";
import { Link, useLocation } from "react-router-dom";
import AuthShell from "../../components/auth/AuthShell";
import PrimaryButton from "../../components/shared/buttons/PrimaryButton";

interface LocationState {
  email?: string;
}

const ForgotPasswordSentPage: React.FC = () => {
  const location = useLocation();
  const state = (location.state || {}) as LocationState;
  const email = state.email ?? "your email address";

  return (
    <AuthShell>
      <div className="flex h-full max-w-md flex-col justify-center">
        <div className="mb-10 flex h-24 w-24 items-center justify-center self-center rounded-full border-4 border-blue-100 bg-blue-50 text-3xl">
          📩
        </div>

        <h1 className="text-center text-xl font-semibold text-gray-900">
          Mail Sent!
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-center text-sm text-gray-500">
          We have sent an email to <span className="font-medium">{email}</span>.
          Please check your inbox and follow the reset instructions.
        </p>

        <div className="mt-8">
          <PrimaryButton fullWidth>
            Check mail →
          </PrimaryButton>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Didn&apos;t receive the mail?{" "}
          <Link
            to="/forgot-password"
            className="font-medium text-blue-600 hover:underline"
          >
            Try again
          </Link>
        </p>
      </div>
    </AuthShell>
  );
};

export default ForgotPasswordSentPage;