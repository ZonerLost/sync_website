import React from "react";
import AvatarCircle from "../shared/data-display/AvatarCircle";
import TextField from "../shared/inputs/TextField";
import { cn } from "../../utils/cn";

export interface EditProfileValues {
  fullName: string;
  email: string;
  phone: string;
  photo?: File | null;
}

interface EditProfilePanelProps {
  initialFullName: string;
  initialEmail: string;
  initialPhone: string;
  initialAvatarUrl?: string;
  onClose: () => void;
  onSave: (values: EditProfileValues) => void;
  isSaving?: boolean;
  errorMessage?: string | null;
}

const EditProfilePanel: React.FC<EditProfilePanelProps> = ({
  initialFullName,
  initialEmail,
  initialPhone,
  initialAvatarUrl,
  onClose,
  onSave,
  isSaving = false,
  errorMessage = null,
}) => {
  const [fullName, setFullName] = React.useState(initialFullName);
  const [email, setEmail] = React.useState(initialEmail);
  const [phone, setPhone] = React.useState(initialPhone);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | undefined>(
    initialAvatarUrl || undefined
  );

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    setFullName(initialFullName);
    setEmail(initialEmail);
    setPhone(initialPhone);
    setSelectedFile(null);
    setPreviewUrl(initialAvatarUrl || undefined);
  }, [initialFullName, initialEmail, initialPhone, initialAvatarUrl]);

  React.useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(nextPreviewUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      photo: selectedFile,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col rounded-3xl bg-white px-4 pb-4 pt-3 shadow-md"
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <span className="text-sm">×</span>
        </button>

        <h2 className="flex-1 text-center text-sm font-semibold text-gray-900">
          Edit Profile
        </h2>

        <div className="h-8 w-8" />
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <div className="flex flex-col items-center">
          <div className="relative">
            <AvatarCircle
              name={fullName}
              src={previewUrl ?? undefined}
              size="xl"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-xs text-white">
                📷
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs font-medium text-gray-600">
            Upload Profile Photo
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
            <button
              type="button"
              onClick={handleChangePhoto}
              className="rounded-full bg-blue-50 px-4 py-1.5 font-semibold text-blue-600 hover:bg-blue-100"
            >
              Change Photo
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
          Personal Information
        </div>

        <div className="mt-2 space-y-3">
          <TextField
            label="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Christopher Henry"
          />

          <TextField
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="christopherhenry344@gmail.com"
          />

          <TextField
            label="Phone number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (67) 567567 66"
          />
        </div>

        {errorMessage ? (
          <div className="mt-3 text-xs text-rose-500">{errorMessage}</div>
        ) : null}
      </div>

      <div className="mt-2 px-2">
        <button
          type="submit"
          disabled={isSaving}
          className={cn(
            "flex h-11 w-full items-center justify-center rounded-2xl bg-[#0F5CCF]",
            "text-sm font-semibold text-white",
            "hover:bg-[#0d4fb3] focus:outline-none focus:ring-2 focus:ring-blue-200",
            "disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          {isSaving ? "Updating..." : "Update →"}
        </button>
      </div>
    </form>
  );
};

export default EditProfilePanel;