// To parse this data:
//
//   import { Convert, OrdersModel } from "./file";
//
//   const ordersModel = Convert.toOrdersModel(json);

import { TOrderStatusKeys } from "../../../../shared/types/types";

export interface OrdersModel {
  data: OrdersModelDatum[];
  meta: Meta;
}

export interface OrdersModelDatum {
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
  data: ProductsDatum[];
}

export interface ProductsDatum {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  name: string;
  selling_price: number;
  image: Image;
}

export interface Image {
  data: ImageData | null;
}

export interface ImageData {
  id: number;
  attributes: TentacledAttributes;
}

export interface TentacledAttributes {
  url: string;
}

export interface User {
  data: UserData;
}

export interface UserData {
  id: number;
  attributes: StickyAttributes;
}

export interface StickyAttributes {
  name: string;
  username: string;
  number: string;
  email: string;
  image: Image;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// Converts JSON strings to/from your types
export class ConvertOrdersModel {
  public static toOrdersModel(json: string): OrdersModel {
    return JSON.parse(json);
  }

  public static ordersModelToJson(value: OrdersModel): string {
    return JSON.stringify(value);
  }
}
