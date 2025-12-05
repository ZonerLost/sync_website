import React from "react";
import TextField from "../shared/inputs/TextField";
import SelectField from "../shared/inputs/SelectField";
import { cn } from "../../utils/cn";

export interface CompanyFormValues {
  name: string;
  commission: number;
  email: string;
  phone: string;
}

interface AddCompanyPanelProps {
  mode: "create" | "edit";
  initialValues?: CompanyFormValues;
  onClose: () => void;
  onSave: (values: CompanyFormValues) => void;
}

const defaultValues: CompanyFormValues = {
  name: "",
  commission: 55,
  email: "",
  phone: "",
};

const AddCompanyPanel: React.FC<AddCompanyPanelProps> = ({
  mode,
  initialValues,
  onClose,
  onSave,
}) => {
  const [values, setValues] = React.useState<CompanyFormValues>(
    initialValues ?? defaultValues
  );

  React.useEffect(() => {
    setValues(initialValues ?? defaultValues);
  }, [initialValues]);

  const handleChange =
    (field: keyof CompanyFormValues) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      const value =
        field === "commission" ? Number(e.target.value) : e.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(values);
  };

  const title = mode === "create" ? "Add Company" : "Edit Company";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col rounded-3xl bg-white px-4 pb-4 pt-3 shadow-md"
    >
      {/* header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <span className="text-sm">×</span>
        </button>
        <h2 className="flex-1 text-center text-sm font-semibold text-gray-900">
          {title}
        </h2>
        <div className="h-8 w-8" />
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <div className="text-[11px] text-gray-500">
          Please add the information to add new company.
        </div>

        <div className="mt-3 space-y-3">
          <TextField
            label="Company name"
            placeholder="Company name here"
            value={values.name}
            onChange={handleChange("name")}
          />

          <SelectField
            label="Commission"
            value={values.commission}
            onChange={handleChange("commission")}
          >
            {[40, 45, 50, 55, 60, 65].map((c) => (
              <option key={c} value={c}>
                {c}%
              </option>
            ))}
          </SelectField>

          <TextField
            label="Email address"
            placeholder="Email address here"
            type="email"
            value={values.email}
            onChange={handleChange("email")}
          />

          <TextField
            label="Phone number"
            placeholder="Phone number here"
            value={values.phone}
            onChange={handleChange("phone")}
          />
        </div>
      </div>

      <div className="mt-2 px-2">
        <button
          type="submit"
          className={cn(
            "flex h-11 w-full items-center justify-center rounded-full bg-[#0F5CCF]",
            "text-sm font-semibold text-white",
            "hover:bg-[#0d4fb3] focus:outline-none focus:ring-2 focus:ring-blue-200"
          )}
        >
          Save →
        </button>
      </div>
    </form>
  );
};

export default AddCompanyPanel;
