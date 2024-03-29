import dayjs from "dayjs";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { AiFillNotification } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import AdminLayout from "../../src/shared/components/AdminLayout";
import EmptyContent from "../../src/shared/components/EmptyContent";
import ErrorContent from "../../src/shared/components/ErrorContent";
import PaginationTabs from "../../src/shared/components/PaginationTabs";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import DateRangePicker from "../../src/shared/components/DateRangePicker";
import { NotificationsModel } from "../../src/modules/notifications/data/models/notifications_model";
import notificationsController from "../../src/modules/notifications/controllers/notifications_controller";
import { observer } from "mobx-react-lite";
import LoaderContent from "../../src/shared/components/LoaderContent";
import { ErrorModel } from "../../src/shared/data/models/errror_model";
import errorToast from "../../src/shared/utils/errorToast";
import adminServerProps from "../../src/shared/utils/adminServerProps";

interface NotificationsPageProps {
  notifications: NotificationsModel | null;
  error: ErrorModel | null;
}

const Notifications: NextPage<NotificationsPageProps> = (props) => {
  const [notifications, setNotifications] = useState(props.notifications);
  const [error, setError] = useState(props.error);

  return (
    <AdminLayout titlePrefix="Notifications">
      <div>
        <div className="flex flex-col gap-2 my-4 sm:items-center sm:justify-between sm:flex-row">
          <p className="custom-heading1">Notifications</p>

          <DateRangePicker
            onChange={(value) => {
              notificationsController.updateDayRange(value);
              if (value.from && value.to) {
                notificationsController.getAll(1).then((res) => {
                  const { error, notifications } = res;
                  if (error) {
                    errorToast(error.name, error.message);

                    return;
                  }

                  setNotifications(notifications);
                });
              }
            }}
          />
        </div>

        <>
          {!notifications ? (
            <ErrorContent
              title="notifications"
              errorName={error?.name}
              errorMessage={error?.message}
              setContent={() => {
                notificationsController.getAll().then((res) => {
                  const { error } = res;
                  if (error) {
                    errorToast(error.name, error.message);

                    setError(error);
                  }
                });
              }}
            />
          ) : (
            <>
              {notificationsController.loading ? (
                <LoaderContent />
              ) : (
                <>
                  {notifications.data.length === 0 ? (
                    <EmptyContent
                      title="Notifications"
                      content="notifications"
                    />
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
                                {dayjs(
                                  notification.attributes.createdAt
                                ).format("hh:mm a, MMM D, YYYY")}
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
                                .delete(notification.id.toString(), page)
                                .then((res) => {
                                  const { error, notifications } = res;
                                  if (error) {
                                    errorToast(error.name, error.message);

                                    return;
                                  }

                                  setNotifications(notifications);
                                });
                            }}
                          >
                            <GrClose className="custom-heading2" />
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}

              <PaginationTabs
                pagination={notifications.meta.pagination}
                setContent={(page) => {
                  notificationsController.getAll(page).then((res) => {
                    const { error, notifications } = res;
                    if (error) {
                      errorToast(error.name, error.message);

                      return;
                    }

                    setNotifications(notifications);
                  });
                }}
              />
            </>
          )}
        </>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return adminServerProps(ctx, async () => {
    return {
      props: await notificationsController.getAll(),
    };
  });
};

export default observer(Notifications);
