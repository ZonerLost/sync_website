import React, { useState } from "react";
import SidePanel from "../../../components/shared/overlay/SidePanel";
import TextField from "../../../components/shared/inputs/TextField";
import PrimaryButton from "../../../components/shared/buttons/PrimaryButton";

export type NewLocksmithForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  salaryProfile: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NewLocksmithForm) => void;
};

const AddLocksmithDrawer: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState<NewLocksmithForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    salaryProfile: "55%",
  });

  const handleChange = (field: keyof NewLocksmithForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <SidePanel
      isOpen={open}
      onClose={onClose}
      title="Add a new locksmith"
      description="Please add the information to add new locksmith."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="First name"
          placeholder="First name here"
          value={form.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <TextField
          label="Last name"
          placeholder="Last name here"
          value={form.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        <TextField
          label="Email address"
          placeholder="Email address here"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <TextField
          label="Phone number"
          placeholder="Phone number here"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />

        {/* Salary profile select */}
        <label className="block text-xs">
          <span className="mb-1 inline-block text-[10px] font-medium text-neutral-500 uppercase tracking-wide">
            Salary Profile
          </span>
          <div className="rounded-2xl bg-neutral-100 px-4 py-3 text-xs text-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/60">
            <select
              className="w-full bg-transparent outline-none"
              value={form.salaryProfile}
              onChange={(e) =>
                handleChange("salaryProfile", e.target.value ?? "55%")
              }
            >
              <option value="55%">55%</option>
              <option value="50%">50%</option>
              <option value="60%">60%</option>
            </select>
          </div>
        </label>

        <div className="pt-4">
          <PrimaryButton type="submit" className="w-full">
            Create →
          </PrimaryButton>
        </div>
      </form>
    </SidePanel>
  );
};

export default AddLocksmithDrawer;
