// To parse this data:
//
//   import { Convert, UserModel } from "./file";
//
//   const userModel = Convert.toUserModel(json);

export interface UserModel {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  number: string | null;
  jwt: string;
  role: Role | null;
  orders: Order[];
  image: Image | null;
}

export interface Image {
  id: number;
  url: string;
}

export interface Order {
  id: number;
  payment_method: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  payment_status: string;
  address: string;
  city: string;
  region: string;
  country: string;
  status: string;
  total: number;
  delivery_date: Date;
  sub_total: number;
  discount: number;
  delivery_cost: number;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  in_stock: number;
  number_sold: number;
  revenue_generated: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  discount: number;
  selling_price: number;
  size: string;
  cost_price: number;
  restock_point: number;
  profit: number;
  image: Image | null;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

// Converts JSON strings to/from your types
export class ConvertUserModel {
  public static toUserModel(json: string): UserModel {
    return JSON.parse(json);
  }

  public static userModelToJson(value: UserModel): string {
    return JSON.stringify(value);
  }
}
