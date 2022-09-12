import http from "../../../../shared/utils/http";
import { ConvertHistoryModel } from "../models/history_model";

export class HistoryProvider {
  create = async (data: string) => {};

  getAll = async (query: string) => {
    const response = await http.get(`/histories?${query}`);

    return ConvertHistoryModel.toHistoryModel(JSON.stringify(response.data));
  };

  delete = async (id: string) => {
    await http.delete(`/histories/${id}`);
  };
}

const historyProvider = new HistoryProvider();
export default historyProvider;
