import { SUCCESS } from "../../../../shared/constants/strings";
import handleError from "../../../../shared/errors/handleError";
import getDateFilterQuery from "../../../../shared/queries/getDateFilterQuery";
import getPaginationQuery from "../../../../shared/queries/getPaginationQuery";
import historyProvider from "../providers/history_provider";

export class HistoryRepository {
  create = async (data: string) => {};

  getAll = async (page: number, startDate: string, endDate: string) => {
    try {
      const query = `${getPaginationQuery(page)}&${getDateFilterQuery(
        startDate,
        endDate
      )}`;
      const results = await historyProvider.getAll(query);

      return {
        error: null,
        results,
      };
    } catch (err) {
      return handleError(err);
    }
  };

  delete = async (id: string) => {
    try {
      await historyProvider.delete(id);

      return {
        error: null,
        results: SUCCESS,
      };
    } catch (err) {
      return handleError(err);
    }
  };
}

const historyRepository = new HistoryRepository();
export default historyRepository;
