import { makeAutoObservable } from "mobx";
import { HOME_TAB_WEEKLY } from "../../../shared/constants/strings";
import { TDashboardDuration } from "../../../shared/types/types";
import dashboardRepository from "../data/repositories/dashboard_repository";

export class DashboardController {
  loading = false;
  tab = HOME_TAB_WEEKLY;

  constructor() {
    makeAutoObservable(this);
  }

  create = async (data: string) => {};

  getOne = async (id: string) => {};

  getMany = async (query: string) => {};

  getAll = async (duration: TDashboardDuration) => {
    this.loading = true;
    const results = await dashboardRepository.getAll(duration);
    this.loading = false;

    return results;
  };

  update = async (id: string, data: string) => {};

  delete = async (id: string) => {};

  updateTab = async (value: string, duration: TDashboardDuration) => {
    this.tab = value;
    return await this.getAll(duration);
  };
}

const dashboardController = new DashboardController();
export default dashboardController;
