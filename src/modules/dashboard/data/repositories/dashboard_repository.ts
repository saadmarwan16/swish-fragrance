import dayjs from "dayjs";
import handleError from "../../../../shared/errors/handleError";
import { TDashboardDuration } from "../../../../shared/types/types";
import dashboardProvider from "../providers/dashboard_provider";
import getDashboardQuery from "../queries/get_dashboard_query";

export class DashboardRepository {
  create = async (data: string) => {};

  getOne = async (id: string) => {};

  getMany = async (query: string) => {};

  getAll = async (duration: TDashboardDuration) => {
    try {
      const results = await dashboardProvider.getAll(this.getQuery(duration));

      return {
        error: null,
        results,
      };
    } catch (err) {
      return handleError(err);
    }
  };

  update = async (id: string, data: string) => {};

  delete = async (id: string) => {};

  getQuery = (duration: TDashboardDuration) => {
    const currentStart = dayjs().startOf(duration).format("YYYY-MM-DD");
    const currentEnd = dayjs().format("YYYY-MM-DD");
    const previousStart = dayjs()
      .startOf(duration)
      .subtract(1, duration)
      .format("YYYY-MM-DD");
    const previousEnd = dayjs()
      .startOf(duration)
      .subtract(1, "day")
      .format("YYYY-MM-DD");

    return `${getDashboardQuery(
      previousStart,
      previousEnd,
      currentStart,
      currentEnd
    )}`;
  };
}

const dashboardRepository = new DashboardRepository();
export default dashboardRepository;
