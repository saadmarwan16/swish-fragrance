import getDateFilterQuery from "../../../../shared/queries/getDateFilterQuery";
import getPaginationQuery from "../../../../shared/queries/getPaginationQuery";
import notificationsProvider from "../providers/notifications_provider";

export class NoficationsRepository {
  create = async (data: string) => {};

  getOne = async (id: string) => {};

  getMany = async (page: number, startDate: string, endDate: string) => {
    const query =
      getPaginationQuery(page) + "&" + getDateFilterQuery(startDate, endDate);

    return notificationsProvider.getMany(query);
  };

  getAll = async (page: number, startDate: string, endDate: string) => {
    const query =
      getPaginationQuery(page) + "&" + getDateFilterQuery(startDate, endDate);

    return notificationsProvider.getAll(query);
  };

  update = async (id: string, data: string) => {};

  delete = async (id: string) => {
    await notificationsProvider.delete(id);
  };
}

const notificationsRepository = new NoficationsRepository();
export default notificationsRepository;
