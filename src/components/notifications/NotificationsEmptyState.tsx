import React from "react";

const NotificationsEmptyState: React.FC = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="mb-3 text-5xl">🔔</div>
      <div className="text-sm font-semibold text-gray-900">
        No Notifications Yet!
      </div>
      <div className="mt-1 text-xs text-gray-500">
        No notifications to be shown yet.
      </div>
    </div>
  );
};

export default NotificationsEmptyState;
