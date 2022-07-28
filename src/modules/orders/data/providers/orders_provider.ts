import getOrderPopulateQuery from "../../../../shared/queries/getOrderPopulateQuery";
import getOrderStatusFilterQuery from "../../../../shared/queries/getOrderStatusFilterQuery";
import getPaginationQuery from "../../../../shared/queries/getPaginationQuery";
import http from "../../../../shared/utils/http";
import { ConvertOrdersModel } from "../models/orders_model";
import { ConvertOrderModel } from "../models/order_model";

export class OrdersProvider {
  getOrder = async (id: string) => {
    const order = await http.get(`/orders/${id}?${getOrderPopulateQuery()}`);

    return ConvertOrderModel.toOrderModel(JSON.stringify(order.data));
  };

  getOrders = async (page: number, filter: string) => {
    const orders = await http.get(
      `/orders?${getPaginationQuery(page)}&${getOrderStatusFilterQuery(
        filter
      )}&${getOrderPopulateQuery()}`
    );

    return ConvertOrdersModel.toOrdersModel(JSON.stringify(orders.data));
  };

  addOrder = async () => {};

  updateOrderStatus = async (id: number, status: string) => {
    const order = await http.put(`/orders/${id}?${getOrderPopulateQuery()}`, {
      data: {
        status,
      },
    });

    return ConvertOrderModel.toOrderModel(JSON.stringify(order.data));
  };

  deleteOrder = async () => {};
}

const ordersProvider = new OrdersProvider();
export default ordersProvider;
