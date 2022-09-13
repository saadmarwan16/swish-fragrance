import http from "../../../../shared/utils/http";
import { ConvertDashboardModel } from "../models/dashboard_model";

export class DashboardProvider {
  create = async (data: string) => {};

  getOne = async (id: string) => {};

  getMany = async (query: string) => {};

  getAll = async (query: string) => {
    console.log(query);
    const response = await http.get(`/admin?${query}`);

    return ConvertDashboardModel.toDashboardModel(
      JSON.stringify(response.data)
    );
  };

  update = async (id: string, data: string) => {};

  delete = async (id: string) => {};
}

const dashboardProvider = new DashboardProvider();
export default dashboardProvider;
