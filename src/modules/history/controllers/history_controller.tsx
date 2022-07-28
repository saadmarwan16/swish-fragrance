import { HistoryModel } from "../data/models/history_model";
import historyProvider from "../data/providers/history_provider";

export class HistoryController {
  histories: HistoryModel | null = null;

  getHistories = async (page?: number) => {
    const histories = await historyProvider.getHistories(page ?? 1);
    this.histories = histories;

    return histories;
  };

  addHistory = async () => {};

  deleteHistory = async (id: number, page: number) => {
    return await historyProvider.deleteHistory(id, page);
  };
}

const historyController = new HistoryController();
export default historyController;
