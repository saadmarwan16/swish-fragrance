import { makeAutoObservable } from "mobx";
import { TOrderStatusKeys } from "../../../shared/types/types";
import { OrdersModel } from "./orders_model";
import ordersProvider from "./orders_provider";

export class OrdersController {
  orders: OrdersModel | null = null;
  loading = false;
  filter = "All";

  constructor() {
    makeAutoObservable(this);
  }

  updateFilter = async (filter: string, page?: number) => {
    this.filter = filter;
    return await this.getOrders(page, filter);
  };

  getOrder = async (id: string) => {
    const order = await ordersProvider.getOrder(id);

    return order;
  };

  getOrders = async (page?: number, filter?: string) => {
    try {
      this.loading = true;
      const orders = await ordersProvider.getOrders(
        page ?? 1,
        filter ?? this.filter
      );
      this.orders = orders;

      return orders;
    } catch (_) {
      return null;
    } finally {
      this.loading = false;
    }
  };

  addOrder = async () => {};

  updateOrderStatus = async (id: number, status: TOrderStatusKeys) => {
    try {
      return await ordersProvider.updateOrderStatus(id, status);
    } catch (_) {
      return null;
    }
  };

  deleteOrder = async () => {};
}

const ordersController = new OrdersController();
export default ordersController;
