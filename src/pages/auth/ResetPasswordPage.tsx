import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AuthShell from "../../components/auth/AuthShell";
import PasswordField from "../../components/shared/form/PasswordField";
import PrimaryButton from "../../components/shared/buttons/PrimaryButton";
import { useResetPassword } from "../../hooks/auth/useResetPassword";
import { getApiErrorMessage } from "../../api/core/http";

type ResetParams = {
  token?: string;
};

function normalizeToken(token?: string | null): string | null {
  const normalized = token?.trim() ?? "";
  return normalized.length > 0 ? normalized : null;
}

const ResetPasswordPage: React.FC = () => {
  const { token: tokenFromParams } = useParams<ResetParams>();
  const location = useLocation();
  const navigate = useNavigate();
  const resetPasswordMutation = useResetPassword();

  const queryToken = React.useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("token");
  }, [location.search]);

  const token = React.useMemo(
    () => normalizeToken(tokenFromParams) ?? normalizeToken(queryToken),
    [tokenFromParams, queryToken]
  );

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("This reset link is invalid or expired.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        token,
        newPassword: password,
      });

      navigate("/login", { replace: true });
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  };

  if (!token) {
    return (
      <AuthShell>
        <div className="max-w-md">
          <h1 className="text-xl font-semibold text-gray-900">Invalid Link</h1>
          <p className="mt-2 text-sm text-gray-500">
            This reset link is invalid or expired.
          </p>

          <div className="mt-6">
            <PrimaryButton
              type="button"
              fullWidth
              onClick={() => navigate("/forgot-password", { replace: true })}
            >
              Back to Forgot Password
            </PrimaryButton>
          </div>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="max-w-md">
        <h1 className="text-xl font-semibold text-gray-900">Reset Password</h1>
        <p className="mt-1 text-sm text-gray-500">
          Please create your new password and try not to share it with anyone.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <PasswordField
            label="Create new password"
            placeholder="New password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordField
            label="Confirm new password"
            placeholder="Confirm password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="pt-1 text-xs text-red-500">{error}</p>}

          <div className="pt-2">
            <PrimaryButton
              type="submit"
              fullWidth
              loading={resetPasswordMutation.isPending}
              disabled={resetPasswordMutation.isPending}
            >
              Confirm
            </PrimaryButton>
          </div>
        </form>
      </div>
    </AuthShell>
  );
};

export default ResetPasswordPage;