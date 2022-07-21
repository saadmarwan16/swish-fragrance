import { makeAutoObservable } from "mobx";
import { OrdersModel } from "./orders_model";
import ordersProvider from "./orders_provider";

export class OrdersController {
  orders: OrdersModel | null = null;
  loading = false;
  filter = "all";

  constructor() {
    makeAutoObservable(this);
  }

  updateFilter = async (filter: string, page?: number) => {
    this.filter = filter;
    return await this.getOrders(undefined, filter);
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

  updateOrder = async () => {};

  deleteOrder = async () => {};
}

const ordersController = new OrdersController();
export default ordersController;
