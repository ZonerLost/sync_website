import React from "react";
import type { Notification } from "../../models/notification";
import AvatarCircle from "../shared/data-display/AvatarCircle";
import { FiTrash2 } from "react-icons/fi";
import { cn } from "../../utils/cn";

interface NotificationItemProps {
  item: Notification;
  onDeleteClick: (item: Notification) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  item,
  onDeleteClick,
}) => {
  return (
    <div
      className={cn(
        "group mb-2 flex items-center justify-between rounded-3xl bg-white px-4 py-3 shadow-sm last:mb-0"
      )}
    >
      {/* left: avatar + text */}
      <div className="flex flex-1 items-center gap-3">
        <AvatarCircle
          name={item.initial}
          size="md"
          color={variantToColor(item.variant)}
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">
            {item.title}
          </span>
          <span className="mt-0.5 text-xs text-gray-500">
            {item.body}
          </span>
        </div>
      </div>

      {/* right: time + delete icon on hover */}
      <div className="ml-3 flex items-center gap-2">
        <span className="text-xs text-gray-400">{item.time}</span>

        <button
          type="button"
          onClick={() => onDeleteClick(item)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-rose-500",
            "opacity-0 transition-opacity group-hover:opacity-100"
          )}
          aria-label="Delete notification"
        >
          <FiTrash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;

// helper to choose avatar color
function variantToColor(variant: Notification["variant"]) {
  switch (variant) {
    case "success":
      return "green";
    case "warning":
      return "amber";
    default:
      return "gray";
  }
}
