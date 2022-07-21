import { NotificationsModel } from "./notifications_model";
import notificationsProvider from "./notifications_provider";

export class NotificationsController {
  notifications: NotificationsModel | null = null;

  getNotifications = async (page?: number) => {
    try {
      const notifications = await notificationsProvider.getNotifications(
        page ?? 1
      );
      this.notifications = notifications;

      return notifications;
    } catch (_) {
      return null;
    } finally {
    }
  };

  addNotification = async () => {};

  deleteNotification = async (id: number, page: number) => {
    try {
      return await notificationsProvider.deleteNotification(id, page);
    } catch (_) {
      return null;
    }
  };
}

const notificationsController = new NotificationsController();
export default notificationsController;
