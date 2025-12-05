import React from "react";
import type { Notification } from "../../models/notification";
import NotificationItem from "./NotificationItem";

interface NotificationsListProps {
  notifications: Notification[];
  onDeleteClick: (item: Notification) => void;
}

/**
 * Groups notifications by dateLabel: "Today", "Yesterday", etc.
 */
const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onDeleteClick,
}) => {
  const groups = React.useMemo(() => {
    const map = new Map<string, Notification[]>();
    for (const n of notifications) {
      const label = n.dateLabel || "Other";
      if (!map.has(label)) map.set(label, []);
      map.get(label)!.push(n);
    }
    return Array.from(map.entries());
  }, [notifications]);

  return (
    <div className="mt-3">
      {groups.map(([label, items]) => (
        <div key={label} className="mb-3 last:mb-0">
          {/* label like 'Today', 'Yesterday' (except when it's Today to match your UI?) */}
          {label !== "Today" && (
            <div className="mb-1 text-[11px] font-semibold text-gray-400">
              {label}
            </div>
          )}

          {label === "Today" && (
            <div className="mb-1 text-[11px] font-semibold text-gray-400">
              {/* In your Figma the top group has no label; 
                 if you want exact match, comment this out. */}
            </div>
          )}

          {items.map((item) => (
            <NotificationItem
              key={item.id}
              item={item}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default NotificationsList;
