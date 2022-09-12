import http from "../../../../shared/utils/http";
import { ConvertOrdersModel } from "../models/orders_model";

export class OrdersProvider {
  create = async (data: string) => {};

  getAll = async (query: string) => {
    const response = await http.get(`/orders?${query}`);

    return ConvertOrdersModel.toOrdersModel(JSON.stringify(response.data));
  };
}

const ordersProvider = new OrdersProvider();
export default ordersProvider;
