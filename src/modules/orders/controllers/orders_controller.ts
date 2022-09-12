import { makeAutoObservable } from "mobx";
import { OrdersModel } from "../data/models/orders_model";
import ordersRepository from "../data/repositories/orders_repository";

export class OrdersController {
  orders: OrdersModel | null = null;
  loading = false;
  filter = "All";

  constructor() {
    makeAutoObservable(this);
  }

  create = async (data: string) => {};

  getAll = async (page?: number, filter?: string) => {
    this.loading = true;
    const { error, results } = await ordersRepository.getAll(
      page ?? 1,
      filter ?? this.filter
    );
    this.orders = results;
    this.loading = false;

    return {
      error,
      orders: results,
    };
  };

  updateFilter = async (filter: string, page?: number) => {
    this.filter = filter;
    return await this.getAll(page, filter);
  };
}

const ordersController = new OrdersController();
export default ordersController;
