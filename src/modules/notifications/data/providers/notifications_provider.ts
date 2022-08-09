import http from "../../../../shared/utils/http";
import { ConvertNotificationsModel } from "../models/notifications_model";

export class NotificationsProvider {
  create = async (data: string) => {};

  getOne = async (id: string) => {};

  getMany = async (query: string) => {
    const notifications = await http.get(`/notifications?${query}`);

    return ConvertNotificationsModel.toNotificationsModel(
      JSON.stringify(notifications.data)
    );
  };

  getAll = async (query: string) => {
    const notifications = await http.get(`/notifications?${query}`);

    return ConvertNotificationsModel.toNotificationsModel(
      JSON.stringify(notifications.data)
    );
  };

  update = async (id: string, data: string) => {};

  delete = async (id: string) => {
    await http.delete(`/notifications/${id}`);
  };
}

const notificationsProvider = new NotificationsProvider();
export default notificationsProvider;
