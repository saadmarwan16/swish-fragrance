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

  getOne = async (id: string) => {};

  getMany = async (page: number) => {
    try {
      this.loading = true;
      const notifications = await notificationsRepository.getAll(
        page,
        getFormattedQueryDate(this.dayRange.from),
        getFormattedQueryDate(this.dayRange.to)
      );
      this.notifications = notifications;

      return notifications;
    } catch (_) {
      return null;
    } finally {
      this.loading = false;
    }
  };

  getAll = async (page?: number) => {
    try {
      this.loading = true;
      const notifications = await notificationsRepository.getAll(
        page ?? 1,
        getFormattedQueryDate(this.dayRange.from),
        getFormattedQueryDate(this.dayRange.to)
      );
      this.notifications = notifications;

      return notifications;
    } catch (_) {
      return null;
    } finally {
      this.loading = false;
    }
  };

  update = async (id: string, data: string) => {};

  delete = async (id: string, page: number) => {
    try {
      await notificationsRepository.delete(id);
      const notifications = await notificationsRepository.getMany(
        page,
        getFormattedQueryDate(this.dayRange.from),
        getFormattedQueryDate(this.dayRange.to)
      );
      this.notifications = notifications;

      return notifications;
    } catch (_) {
      return null;
    }
  };

  updateDayRange = (value: DayRange) => (this.dayRange = value);
}

const notificationsController = new NotificationsController();
export default notificationsController;
