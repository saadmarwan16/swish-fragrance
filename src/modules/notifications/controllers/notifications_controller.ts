import { NotificationsModel } from "../data/models/notifications_model";

import { makeAutoObservable } from "mobx";
import { getFormattedQueryDate } from "../../../shared/utils/getFormattedDate";
import notificationsRepository from "../data/repositories/notifications_repository";
import { DayRange, utils } from "@amir04lm26/react-modern-calendar-date-picker";
import getWeekBeforeDate from "../../../shared/utils/getWeekBeforeDate";

export class NotificationsController {
  notifications: NotificationsModel | null = null;
  loading = false;
  dayRange: DayRange = {
    from: getWeekBeforeDate(),
    to: utils("en").getToday(),
  };

  constructor() {
    makeAutoObservable(this);
  }

  create = async (data: string) => {};

  getAll = async (page?: number) => {
    this.loading = true;
    const { error, results } = await notificationsRepository.getAll(
      page ?? 1,
      getFormattedQueryDate(this.dayRange.from),
      getFormattedQueryDate(this.dayRange.to)
    );
    this.notifications = results;
    this.loading = false;

    return { error, notifications: results };
  };

  delete = async (id: string, page: number) => {
    const { error, results } = await notificationsRepository.delete(id);
    if (!error) {
      const { error, results } = await notificationsRepository.getAll(
        page,
        getFormattedQueryDate(this.dayRange.from),
        getFormattedQueryDate(this.dayRange.to)
      );
      this.notifications = results;

      return {
        error,
        notifications: results,
      };
    }

    return { error, notifications: results };
  };

  updateDayRange = (value: DayRange) => (this.dayRange = value);
}

const notificationsController = new NotificationsController();
export default notificationsController;
