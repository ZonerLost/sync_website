import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import AuthShell from "../../components/auth/AuthShell";
import TextField from "../../components/shared/form/TextField";
import PasswordField from "../../components/shared/form/PasswordField";
import PrimaryButton from "../../components/shared/buttons/PrimaryButton";
import { useAuth } from "../../context/AuthContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Enter both email and password to continue.");
      return;
    }

    setLoading(true);
    try {
      // Simulated login until backend is wired up
      await new Promise((r) => setTimeout(r, 800));

      login({
        token: "dev-token",
        user: { id: "demo-user", name: "Demo User", email },
        remember: rememberMe,
      });

      const redirectTo =
        (location.state as { from?: string })?.from ?? "/dashboard";

      navigate(redirectTo, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="w-full   my-auto ">
        <h1 className="text-xl mt-10 font-semibold text-gray-900">
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
                className="h-4 w-10 rounded border-gray-300 text-blue-600 focus:ring-blue-700"
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

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <div className="pt-2">
            <PrimaryButton
              type="submit"
              fullWidth
              loading={loading}
              disabled={!email || !password}
              className="bg-[#7fa4d6] text-sm font-semibold tracking-tight text-white hover:bg-[#7598c9] disabled:bg-[#b7c9e2]"
            >
              Continue 
            </PrimaryButton>
          </div>

          {/* Social logins */}
          <div className="mt-8 space-y-4 text-xs">
            <div className="flex items-center gap-3 text-gray-400">
              <span className="h-px flex-1 bg-gray-200" />
              <span className="uppercase tracking-wide">or sign in</span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      d="M21.6 12.23c0-.68-.06-1.35-.18-2H12v3.8h5.4c-.24 1.25-.98 2.31-2.09 3v2.5h3.38c1.98-1.82 3.11-4.5 3.11-7.3Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 22c2.79 0 5.12-.92 6.83-2.47l-3.38-2.5c-.94.63-2.15 1-3.45 1-2.65 0-4.9-1.79-5.7-4.2H2.82v2.64C4.51 19.98 7.96 22 12 22Z"
                      fill="#34A853"
                    />
                    <path
                      d="M6.3 13.83c-.21-.63-.33-1.3-.33-1.99s.12-1.36.33-1.99V7.2H2.82A9.99 9.99 0 0 0 2 11.84c0 1.62.39 3.16 1.08 4.64l3.22-2.65Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.5c1.52 0 2.89.52 3.97 1.53l2.98-2.98C17.1 2.91 14.78 2 12 2 7.96 2 4.51 4.02 2.82 7.2l3.48 2.65C7.1 7.29 9.35 5.5 12 5.5Z"
                      fill="#EA4335"
                    />
                  </svg>
                </span>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center">
                  <FaApple className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>Apple</span>
              </button>
            </div>
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
