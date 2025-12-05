import React from "react";
import PageContainer from "../../components/shared/layout/PageContainer";
import NotificationsEmptyState from "../../components/notifications/NotificationsEmptyState";
import NotificationsList from "../../components/notifications/NotificationsList";
import ConfirmDialog from "../../components/shared/overlay/ConfirmDialog";
import type { Notification } from "../../models/notification";
import { MOCK_NOTIFICATIONS } from "./mockNotifications";

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] =
    React.useState<Notification[]>(MOCK_NOTIFICATIONS);

  const [toDelete, setToDelete] = React.useState<Notification | null>(null);

  const handleDeleteRequest = (item: Notification) => {
    setToDelete(item);
  };

  const handleConfirmDelete = () => {
    if (!toDelete) return;
    const id = toDelete.id;
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setToDelete(null);
  };

  const handleCancelDelete = () => {
    setToDelete(null);
  };

  const hasNotifications = notifications.length > 0;

  return (
    <PageContainer fullWidth>
      <h1 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
        Notifications
      </h1>

      <div className="h-[calc(100vh-140px)] rounded-3xl bg-[#f5f5f6] p-3 md:p-4">
        {!hasNotifications ? (
          <NotificationsEmptyState />
        ) : (
          <NotificationsList
            notifications={notifications}
            onDeleteClick={handleDeleteRequest}
          />
        )}
      </div>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this notification?"
        description={
          toDelete
            ? `Are you sure you want to delete “${toDelete.title}”?`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </PageContainer>
  );
};

export default NotificationsPage;
