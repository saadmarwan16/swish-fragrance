import http from "../../../../shared/utils/http";
import { ConvertNotificationsModel } from "../models/notifications_model";

export class NotificationsProvider {
  create = async (data: string) => {};

  getAll = async (query: string) => {
    const response = await http.get(`/notifications?${query}`);

    return ConvertNotificationsModel.toNotificationsModel(
      JSON.stringify(response.data)
    );
  };

  delete = async (id: string) => {
    await http.delete(`/notifications/${id}`);
  };
}

const notificationsProvider = new NotificationsProvider();
export default notificationsProvider;
