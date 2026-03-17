import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthShell from "../../components/auth/AuthShell";
import TextField from "../../components/shared/form/TextField";
import PrimaryButton from "../../components/shared/buttons/PrimaryButton";
import { useVerifyEmail } from "../../hooks/auth/useVerifyEmail";
import { useResendVerification } from "../../hooks/auth/useResendVerification";
import { useAuth } from "../../context/AuthContext";
import { getApiErrorMessage } from "../../api/core/http";

type LocationState = {
  email?: string;
};

const VerifyEmailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSession } = useAuth();

  const verifyMutation = useVerifyEmail();
  const resendMutation = useResendVerification();

  const state = (location.state || {}) as LocationState;

  const [email, setEmail] = React.useState(state.email ?? "");
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim() || !code.trim()) {
      setError("Email and verification code are required.");
      return;
    }

    try {
      const result = await verifyMutation.mutateAsync({
        email: email.trim(),
        code: code.trim(),
      });

      setSession({
        token: result.token,
        user: result.user,
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  }

  async function handleResend() {
    setError(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setError("Please enter your email first.");
      return;
    }

    try {
      const result = await resendMutation.mutateAsync({
        email: email.trim(),
      });

      setSuccessMessage(result.message);
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  }

  return (
    <AuthShell>
      <div className="w-full my-auto">
        <h1 className="mt-10 text-xl font-semibold text-gray-900">
          Verify your email
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter the verification code sent to your email.
        </p>

        <form onSubmit={handleVerify} className="mt-8 space-y-4">
          <TextField
            label="Email address"
            name="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Verification code"
            name="code"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          {error && <p className="text-xs text-red-500">{error}</p>}
          {successMessage && (
            <p className="text-xs text-green-600">{successMessage}</p>
          )}

          <div className="pt-2">
            <PrimaryButton
              type="submit"
              fullWidth
              loading={verifyMutation.isPending}
              disabled={verifyMutation.isPending}
              className="bg-[#7fa4d6] text-sm font-semibold tracking-tight text-white hover:bg-[#7598c9] disabled:bg-[#b7c9e2]"
            >
              Verify email
            </PrimaryButton>
          </div>

          <button
            type="button"
            onClick={handleResend}
            disabled={resendMutation.isPending}
            className="w-full text-sm font-medium text-blue-600 hover:underline disabled:opacity-50"
          >
            {resendMutation.isPending ? "Resending..." : "Resend verification code"}
          </button>

          <p className="mt-6 text-center text-xs text-gray-500">
            Back to{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthShell>
  );
};

export default VerifyEmailPage;