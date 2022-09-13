import dayjs from "dayjs";
import handleError from "../../../../shared/errors/handleError";
import { TDashboardDuration } from "../../../../shared/types/types";
import dashboardProvider from "../providers/dashboard_provider";
import getOrderQuery from "../queries/get_order_query";
import getPreviousOrderQuery from "../queries/get_previous_order_query";
import getProductQuery from "../queries/get_product_query";

export class DashboardRepository {
  create = async (data: string) => {};

  getOne = async (id: string) => {};

  getMany = async (query: string) => {};

  getAll = async (duration: TDashboardDuration) => {
    try {
      const results = await dashboardProvider.getAll(this.getQuery(duration));

      console.log(results);

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
      .subtract(1, "day")
      .format("YYYY-MM-DD");
    const previousEnd = dayjs()
      .startOf(duration)
      .subtract(1, duration)
      .format("YYYY-MM-DD");

    return `${getPreviousOrderQuery(
      previousStart,
      previousEnd
    )}&${getOrderQuery(currentStart, currentEnd)}&${getProductQuery(
      currentStart,
      currentEnd
    )}`;
  };
}

const dashboardRepository = new DashboardRepository();
export default dashboardRepository;
