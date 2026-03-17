import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../../components/auth/AuthShell";
import TextField from "../../components/shared/form/TextField";
import PasswordField from "../../components/shared/form/PasswordField";
import PrimaryButton from "../../components/shared/buttons/PrimaryButton";
import { getApiErrorMessage } from "../../api/core/http";
import { useRegister } from "../../hooks/auth/useRegister";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "operator",
  });

  const [error, setError] = React.useState<string | null>(null);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.password.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await registerMutation.mutateAsync({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
        role: form.role,
      });

      navigate("/verify-email", {
        replace: true,
        state: {
          email: form.email.trim(),
        },
      });
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  }

  return (
    <AuthShell>
      <div className="w-full my-auto">
        <h1 className="mt-10 text-xl font-semibold text-gray-900">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Fill in your details to get started.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <TextField
            label="Full name"
            name="fullName"
            placeholder="Full name"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
          />

          <TextField
            label="Email address"
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />

          <TextField
            label="Phone number"
            name="phone"
            type="tel"
            placeholder="+447700900123"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />

          <PasswordField
            label="Password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
          />

          <PasswordField
            label="Confirm password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={(e) => updateField("confirmPassword", e.target.value)}
          />

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="pt-2">
            <PrimaryButton
              type="submit"
              fullWidth
              loading={registerMutation.isPending}
              disabled={registerMutation.isPending}
              className="bg-[#7fa4d6] text-sm font-semibold tracking-tight text-white hover:bg-[#7598c9] disabled:bg-[#b7c9e2]"
            >
              Create account
            </PrimaryButton>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            Already have an account?{" "}
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

export default RegisterPage;