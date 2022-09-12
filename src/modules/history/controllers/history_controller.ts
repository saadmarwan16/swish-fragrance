import { DayRange, utils } from "@amir04lm26/react-modern-calendar-date-picker";
import { getFormattedQueryDate } from "../../../shared/utils/getFormattedDate";
import getWeekBeforeDate from "../../../shared/utils/getWeekBeforeDate";
import { HistoryModel } from "../data/models/history_model";
import historyRepository from "../data/repositories/history_repository";

export class HistoryController {
  histories: HistoryModel | null = null;
  loading = false;
  dayRange: DayRange = {
    from: getWeekBeforeDate(),
    to: utils("en").getToday(),
  };

  create = async (data: string) => {};

  getAll = async (page?: number) => {
    this.loading = true;
    const { error, results } = await historyRepository.getAll(
      page ?? 1,
      getFormattedQueryDate(this.dayRange.from),
      getFormattedQueryDate(this.dayRange.to)
    );
    this.histories = results;
    this.loading = false;

    return {
      error,
      histories: results,
    };
  };

  delete = async (id: string, page: number) => {
    const { error, results } = await historyRepository.delete(id);
    if (!error) {
      const { error, results } = await historyRepository.getAll(
        page,
        getFormattedQueryDate(this.dayRange.from),
        getFormattedQueryDate(this.dayRange.to)
      );
      this.histories = results;

      return {
        error,
        histories: results,
      };
    }

    return { error, histories: results };
  };

  updateDayRange = (value: DayRange) => (this.dayRange = value);
}

const historyController = new HistoryController();
export default historyController;
