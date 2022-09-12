import handleError from "../../../../shared/errors/handleError";
import getPaginationQuery from "../../../../shared/queries/getPaginationQuery";
import ordersProvider from "../providers/orders_provider";
import getOrdersPopulateQuery from "../queries/getOrdersPopulateQuery";
import getOrdersStatusFilterQuery from "../queries/getOrdersStatusFilterQuery";

export class OrdersRepository {
  create = async (data: string) => {};

  getAll = async (page: number, filter: string) => {
    try {
      const query = `${getPaginationQuery(page)}&${getOrdersStatusFilterQuery(
        filter
      )}&${getOrdersPopulateQuery()}`;
      const results = await ordersProvider.getAll(query);

      return {
        error: null,
        results,
      };
    } catch (err) {
      return handleError(err);
    }
  };
}

const ordersRepository = new OrdersRepository();
export default ordersRepository;
