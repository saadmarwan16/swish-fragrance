// To parse this data:
//
//   import { Convert, OrderModel } from "./file";
//
//   const orderModel = Convert.toOrderModel(json);

export interface OrderModel {
  data: Data;
  meta: Meta;
}

export interface Data {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  amount: number;
  payment_method: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  payment_status: string;
  address: string | null;
  city: string | null;
  region: string | null;
  country: string;
}

export interface Meta {}

// Converts JSON strings to/from your types
export class ConvertOrderModel {
  public static toOrderModel(json: string): OrderModel {
    return JSON.parse(json);
  }

  public static orderModelToJson(value: OrderModel): string {
    return JSON.stringify(value);
  }
}
