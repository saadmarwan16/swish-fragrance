import handleError from "../../../../shared/errors/handleError";
import orderProvider from "../providers/order_provider";
import getOrderPopulateQuery from "../queries/getOrderPopulateQuery";

export class OrderRepository {
  getOne = async (id: string) => {
    try {
      const query = getOrderPopulateQuery();
      const results = await orderProvider.getOne(id, query);

      return {
        error: null,
        results,
      };
    } catch (err) {
      return handleError(err);
    }
  };

  update = async (id: string, data: string) => {
    try {
      const query = getOrderPopulateQuery();
      const results = await orderProvider.update(
        id,
        JSON.stringify({ data: { status: data } }),
        query
      );

      return {
        error: null,
        results,
      };
    } catch (err) {
      return handleError(err);
    }
  };

  delete = async (id: string) => {};
}

const orderRepository = new OrderRepository();
export default orderRepository;
