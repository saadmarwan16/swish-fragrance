import getPaginationQuery from "../../../shared/queries/getPaginationQuery";
import http from "../../../shared/utils/http";
import { ConvertHistoryModel } from "./history_model";

export class HistoryProvider {
  getHistories = async (page: number) => {
    const histories = await http.get(`/histories?${getPaginationQuery(page)}`);

    return ConvertHistoryModel.toHistoryModel(JSON.stringify(histories.data));
  };

  addHistory = async () => {};

  deleteHistory = async (id: number, page: number) => {
    await http.delete(`/histories/${id}`);
    return await this.getHistories(page);
  };
}

const historyProvider = new HistoryProvider();
export default historyProvider;
