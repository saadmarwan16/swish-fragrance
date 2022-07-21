import getPaginationQuery from "../../../shared/queries/getPaginationQuery";
import http from "../../../shared/utils/http";
import { ConvertNotificationsModel } from "./notifications_model";

export class NotificationsProvider {
  getNotifications = async (page: number) => {
    const notifications = await http.get(
      `/notifications?${getPaginationQuery(page)}`
    );

    return ConvertNotificationsModel.toNotificationsModel(
      JSON.stringify(notifications.data)
    );
  };

  addNotification = async () => {};

  deleteNotification = async (id: number, page: number) => {
    await http.delete(`/notifications/${id}`);
    return await this.getNotifications(page);
  };
}

const notificationsProvider = new NotificationsProvider();
export default notificationsProvider;
