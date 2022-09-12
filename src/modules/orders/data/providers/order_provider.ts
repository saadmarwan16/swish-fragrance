import http from "../../../../shared/utils/http";
import { ConvertOrderModel } from "../models/order_model";

export class OrderProvider {
  getOne = async (id: string, query: string) => {
    const response = await http.get(`/orders/${id}?${query}`);

    return ConvertOrderModel.toOrderModel(JSON.stringify(response.data));
  };

  update = async (id: string, data: string, query: string) => {
    const response = await http.put(`/orders/${id}?${query}`, data);

    return ConvertOrderModel.toOrderModel(JSON.stringify(response.data));
  };

  delete = async (id: string) => {};
}

const orderProvider = new OrderProvider();
export default orderProvider;
