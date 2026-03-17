import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthShell from "../../components/auth/AuthShell";
import TextField from "../../components/shared/form/TextField";
import PasswordField from "../../components/shared/form/PasswordField";
import PrimaryButton from "../../components/shared/buttons/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import { getApiErrorMessage } from "../../api/core/http";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoggingIn } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Enter both email and password to continue.");
      return;
    }

    try {
      await login({
        email: email.trim(),
        password,
        rememberMe,
      });

      const redirectTo =
        (location.state as { from?: string })?.from ?? "/dashboard";

      navigate(redirectTo, { replace: true });
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  };

  return (
    <AuthShell>
      <div className="w-full my-auto">
        <h1 className="mt-10 text-xl font-semibold text-gray-900">
          Login to your account
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Please enter the credentials to get started
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordField
            label="Password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-1 flex items-center justify-between text-sm">
            <label className="inline-flex items-center space-x-2 text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-700"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>

            <Link
              to="/forgot-password"
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="pt-2">
            <PrimaryButton
              type="submit"
              fullWidth
              loading={isLoggingIn}
              disabled={!email.trim() || !password.trim() || isLoggingIn}
              className="bg-[#7fa4d6] text-sm font-semibold tracking-tight text-white hover:bg-[#7598c9] disabled:bg-[#b7c9e2]"
            >
              Continue
            </PrimaryButton>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Create account
            </Link>
          </p>
        </form>
      </div>
    </AuthShell>
  );
};

export default LoginPage;