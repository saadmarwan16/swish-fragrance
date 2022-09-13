import { UserModel } from "../../modules/auth/data/models/user_model";

export interface ILoginInputs {
  identifier: string;
  password: string;
}

export interface INewProductInputs {
  name: string;
  image?: number;
  number_sold: number;
  revenue_generated: number;
  discount: number;
  selling_price: number;
  size: string;
  cost_price: number;
  restock_point: number;
  in_stock: number;
  profit: number;
}

export interface ICategoryInputs {
  name: string;
}

export interface IBrandInputs {
  name: string;
  image?: number;
}

export interface IImageDetails {
  id: number;
  url: string;
}

export interface IAuthContext {
  user: UserModel | null;
  setUser: (user: UserModel | null) => void;
}
