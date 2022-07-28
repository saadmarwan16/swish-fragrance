import getDateFilterQuery from "../../../../shared/queries/getDateFilterQuery";
import http from "../../../../shared/utils/http";
import { ConvertNotificationsModel } from "../models/notifications_model";

export class NotificationsProvider {
  getNotifications = async (page: number) => {
    const notifications = await http.get(
      `/notifications?${getDateFilterQuery("kjfka", "fjkaj")}`
    );
    // const notifications = await http.get(
    //   `/notifications?${getPaginationQuery(page)}&${getDateFilterQuery(
    //     "kjfka",
    //     "fjkaj"
    //   )}`
    // );

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
