import dayjs from "dayjs";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { AiFillNotification } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import notificationsController from "../../src/modules/admin/notifications/notifications_controller";
import { NotificationsModel } from "../../src/modules/admin/notifications/notifications_model";
import AdminLayout from "../../src/shared/components/AdminLayout";
import EmptyContent from "../../src/shared/components/EmptyContent";
import ErrorContent from "../../src/shared/components/ErrorContent";
import LoaderContent from "../../src/shared/components/LoaderContent";
import PaginationTabs from "../../src/shared/components/PaginationTabs";

interface NotificationsPageProps {
  notifications: NotificationsModel | null;
}

const Notifications: NextPage<NotificationsPageProps> = (props) => {
  const [notifications, setNotifications] = useState(props.notifications);

  return (
    <AdminLayout titlePrefix="Notifications">
      <div>
        <p className="custom-heading1">Notifications</p>
        <>
          {!notifications ? (
            <ErrorContent
              title="notifications"
              setContent={() =>
                notificationsController
                  .getNotifications()
                  .then((res) => setNotifications(res))
              }
            />
          ) : (
            <>
              {notifications.data.length === 0 ? (
                <EmptyContent title="Notifications" content="notifications" />
              ) : (
                <>
                  {notifications.data.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-center justify-between gap-4 py-4 border-b border-base-300"
                    >
                      <div className="flex items-center gap-2">
                        <AiFillNotification className="w-20 custom-heading2 text-primary" />
                        <div>
                          <p>{notification.attributes.content}</p>
                          <p className="pt-2 text-xs text-gray-500 sm:text-sm">
                            {dayjs(notification.attributes.createdAt).format(
                              "hh:mm a, MMM D, YYYY"
                            )}
                          </p>
                        </div>
                      </div>
                      <button
                        className="btn btn-square btn-sm btn-ghost"
                        onClick={() => {
                          let page = notifications.meta.pagination.page;
                          if (
                            notifications.meta.pagination.total > 1 &&
                            notifications.data.length === 1
                          ) {
                            page = page - 1;
                          }

                          notificationsController
                            .deleteNotification(notification.id, page)
                            .then((res) => setNotifications(res));
                        }}
                      >
                        <GrClose className="custom-heading2" />
                      </button>
                    </div>
                  ))}
                </>
              )}

              <PaginationTabs
                pagination={notifications.meta.pagination}
                setContent={(page) => {
                  notificationsController
                    .getNotifications(page)
                    .then((res) => setNotifications(res));
                }}
              />
            </>
          )}
        </>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const notifications = await notificationsController.getNotifications();

  return {
    props: {
      notifications,
    },
  };
};

export default Notifications;
