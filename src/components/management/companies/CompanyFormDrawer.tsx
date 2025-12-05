import React, { useEffect, useMemo, useState } from "react";
import SideDrawer from "../../shared/overlay/SideDrawer";
import type { Company, CompanyStatus } from "../../../hooks/management/useCompanies";

type FormState = {
  name: string;
  commissionPercent: number;
  email: string;
  phone: string;
  status: CompanyStatus;
};

const emptyForm: FormState = {
  name: "",
  commissionPercent: 55,
  email: "",
  phone: "",
  status: "active",
};

type Props = {
  open: boolean;
  mode: "create" | "edit";
  initial?: Company | null;
  onClose: () => void;
  onSubmit: (values: FormState) => void;
};

const CompanyFormDrawer: React.FC<Props> = ({
  open,
  mode,
  initial,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && initial) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: initial.name ?? "",
        commissionPercent: initial.commissionPercent ?? 55,
        email: initial.email ?? "",
        phone: initial.phone ?? "",
        status: initial.status ?? "active",
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, mode, initial]);

  const title = useMemo(
    () => (mode === "create" ? "Add Company" : "Edit Company"),
    [mode]
  );

  const set = (patch: Partial<FormState>) =>
    setForm((p) => ({ ...p, ...patch }));

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    onSubmit({
      ...form,
      name: form.name.trim(),
    });
  };

  return (
    <SideDrawer open={open} onClose={onClose} title={title}>
      <div className="space-y-4">
        <p className="text-xs text-gray-500">
          Please add the information to {mode === "create" ? "add" : "update"}{" "}
          company.
        </p>

        {/* Company name */}
        <div className="rounded-2xl bg-gray-50 px-4 py-3">
          <label className="block text-[10px] text-gray-500 mb-1">
            Company name
          </label>
          <input
            value={form.name}
            onChange={(e) => set({ name: e.target.value })}
            placeholder="Company name here"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        {/* Commission */}
        <div className="rounded-2xl bg-gray-50 px-4 py-3">
          <label className="block text-[10px] text-gray-500 mb-1">
            Commission
          </label>
          <select
            value={form.commissionPercent}
            onChange={(e) => set({ commissionPercent: Number(e.target.value) })}
            className="w-full bg-transparent text-sm outline-none"
          >
            {[40, 45, 50, 55, 60].map((p) => (
              <option key={p} value={p}>
                {p}%
              </option>
            ))}
          </select>
        </div>

        {/* Email */}
        <div className="rounded-2xl bg-gray-50 px-4 py-3">
          <label className="block text-[10px] text-gray-500 mb-1">
            Email address
          </label>
          <input
            value={form.email}
            onChange={(e) => set({ email: e.target.value })}
            placeholder="Email address here"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        {/* Phone */}
        <div className="rounded-2xl bg-gray-50 px-4 py-3">
          <label className="block text-[10px] text-gray-500 mb-1">
            Phone number
          </label>
          <input
            value={form.phone}
            onChange={(e) => set({ phone: e.target.value })}
            placeholder="Phone number here"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        {/* Status */}
        <div className="rounded-2xl bg-gray-50 px-4 py-3">
          <label className="block text-[10px] text-gray-500 mb-1">
            Status
          </label>
          <select
            value={form.status}
            onChange={(e) => set({ status: e.target.value as CompanyStatus })}
            className="w-full bg-transparent text-sm outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Bottom CTA */}
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-6 w-full rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium text-white hover:bg-blue-700"
        >
          {mode === "create" ? "Save →" : "Update →"}
        </button>
      </div>
    </SideDrawer>
  );
};

export default CompanyFormDrawer;
