// To parse this data:
//
//   import { Convert, OrderModel } from "./file";
//
//   const orderModel = Convert.toOrderModel(json);

import { TOrderStatusKeys } from "../../../../shared/types/types";

export interface OrderModel {
  data: OrderModelData;
  meta: Meta;
}

export interface OrderModelData {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  payment_method: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  payment_status: string;
  address: string;
  city: string;
  region: string;
  country: string;
  status: TOrderStatusKeys;
  total: number;
  delivery_date: Date;
  sub_total: number;
  discount: number;
  delivery_cost: number;
  user: User;
  products: Products;
}

export interface Products {
  data: Datum[];
}

export interface Datum {
  id: number;
  attributes: DatumAttributes;
}

export interface DatumAttributes {
  name: string;
  selling_price: number;
  image: Image;
}

export interface Image {
  data: ImageData | null;
}

export interface ImageData {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  url: string;
}

export interface User {
  data: UserData;
}

export interface UserData {
  id: number;
  attributes: TentacledAttributes;
}

export interface TentacledAttributes {
  name: string;
  username: string;
  number: string;
  email: string;
  image: Image;
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
