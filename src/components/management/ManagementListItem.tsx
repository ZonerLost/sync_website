import React from "react";
import StatusPill from "../shared/data-display/StatusPill";

export type ManagementUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  statusLabel?: string; // e.g. "Free", "Active"
  statusVariant?: "blue" | "green";
};

type Props = {
  user: ManagementUser;
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
};

const ManagementListItem: React.FC<Props> = ({ user }) => {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-4 text-xs shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[11px] font-semibold text-blue-700">
          {getInitials(user.name)}
        </div>
        <div>
          <div className="text-xs font-medium text-neutral-900">
            {user.name}
          </div>
          <div className="mt-1 text-[11px] text-neutral-500">
            <div className="leading-tight">Email address</div>
            <div className="leading-tight text-neutral-800">{user.email}</div>
            {user.phone && (
              <div className="mt-1 leading-tight text-neutral-500">
                {user.phone}
              </div>
            )}
          </div>
        </div>
      </div>

      {user.statusLabel && (
        <StatusPill
          label={user.statusLabel}
          variant={user.statusVariant ?? "green"}
        />
      )}
    </div>
  );
};

export default ManagementListItem;
