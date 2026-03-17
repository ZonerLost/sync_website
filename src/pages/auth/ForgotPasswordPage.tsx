import React from "react";
import { useNavigate } from "react-router-dom";
import AuthShell from "../../components/auth/AuthShell";
import TextField from "../../components/shared/form/TextField";
import PrimaryButton from "../../components/shared/buttons/PrimaryButton";
import { useForgotPassword } from "../../hooks/auth/useForgotPassword";
import { getApiErrorMessage } from "../../api/core/http";

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const forgotPasswordMutation = useForgotPassword();

  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await forgotPasswordMutation.mutateAsync({
        email: email.trim(),
      });

      navigate("/forgot-password/sent", {
        replace: true,
        state: { email: email.trim() },
      });
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  }

  return (
    <AuthShell>
      <div className="w-full my-auto">
        <h1 className="mt-10 text-xl font-semibold text-gray-900">
          Forgot Password
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter your email address and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <TextField
            label="Email address"
            name="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="pt-2">
            <PrimaryButton
              type="submit"
              fullWidth
              loading={forgotPasswordMutation.isPending}
              disabled={forgotPasswordMutation.isPending}
              className="bg-[#7fa4d6] text-sm font-semibold tracking-tight text-white hover:bg-[#7598c9] disabled:bg-[#b7c9e2]"
            >
              Send reset link
            </PrimaryButton>
          </div>
        </form>
      </div>
    </AuthShell>
  );
};

export default ForgotPasswordPage;