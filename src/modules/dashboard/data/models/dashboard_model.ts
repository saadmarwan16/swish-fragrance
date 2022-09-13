// To parse this data:
//
//   import { Convert, DashboardModel } from "./file";
//
//   const dashboardModel = Convert.toDashboardModel(json);

export interface DashboardModel {
  data: DashboardModelData;
  meta: Meta;
}

export interface DashboardModelData {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  previous_orders: Orders;
  orders: Orders;
  products: FluffyProducts;
}

export interface Orders {
  data: OrdersDatum[];
}

export interface OrdersDatum {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  total: number;
  status: string;
  delivery_date: Date;
  cost_price: number;
  country: string;
  products: PurpleProducts;
  user: User;
}

export interface PurpleProducts {
  data: PurpleDatum[];
}

export interface PurpleDatum {
  id: number;
  attributes: TentacledAttributes;
}

export interface TentacledAttributes {
  name: string;
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
  image: Image;
}

export interface Image {
  data: ImageData | null;
}

export interface ImageData {
  id: number;
  attributes: IndigoAttributes;
}

export interface IndigoAttributes {
  url: string;
}

export interface FluffyProducts {
  data: FluffyDatum[];
}

export interface FluffyDatum {
  id: number;
  attributes: IndecentAttributes;
}

export interface IndecentAttributes {
  number_sold: number;
  name: string;
  selling_price: number;
  image: Image;
}

export interface Meta {}

// Converts JSON strings to/from your types
export class ConvertDashboardModel {
  public static toDashboardModel(json: string): DashboardModel {
    return JSON.parse(json);
  }

  public static dashboardModelToJson(value: DashboardModel): string {
    return JSON.stringify(value);
  }
}
