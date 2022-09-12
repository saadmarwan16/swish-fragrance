import { makeAutoObservable } from "mobx";
import { OrderModel } from "../data/models/order_model";
import orderRepository from "../data/repositories/order_repository";

export class OrderController {
  order: OrderModel | null = null;
  loading = false;
  isUpdating = false;

  constructor() {
    makeAutoObservable(this);
  }

  getOne = async (id: string) => {
    this.loading = true;
    const { error, results } = await orderRepository.getOne(id);
    this.order = results;
    this.loading = false;

    return {
      error,
      order: results,
    };
  };

  update = async (id: string, data: string) => {
    this.isUpdating = true;
    const { error, results } = await orderRepository.update(id, data);
    this.order = results;
    this.isUpdating = false;

    return {
      error,
      order: results,
    };
  };

  delete = async (id: string) => {};
}

const orderController = new OrderController();
export default orderController;
