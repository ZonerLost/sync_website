import React, { useState } from "react";
import SidePanel from "../../../components/shared/overlay/SidePanel";
import TextField from "../../../components/shared/inputs/TextField";
import PrimaryButton from "../../../components/shared/buttons/PrimaryButton";

export type NewPersonForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NewPersonForm) => void;
  title: string;
  description: string;
  submitLabel?: string;
};

const AddPersonDrawer: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  title,
  description,
  submitLabel = "Add",
}) => {
  const [form, setForm] = useState<NewPersonForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (field: keyof NewPersonForm, value: string) => {
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
      title={title}
      description={description}
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

        <div className="pt-4">
          <PrimaryButton
            type="submit"
            className="w-full"
          >
            {submitLabel}
          </PrimaryButton>
        </div>
      </form>
    </SidePanel>
  );
};

export default AddPersonDrawer;
