import { UserModel } from "../../modules/auth/data/models/user_model";
import { TDashboardLevel } from "./types";

export interface ILoginInputs {
  identifier: string;
  password: string;
}

export interface IProductInputs {
  name: string;
  image: File | null | undefined;
  discount: number;
  selling_price: number;
  cost_price: number;
  restock_point: number;
  in_stock: number;
}

export interface ICategoryInputs {
  name: string;
  products: IProductSizeOption[];
}

export interface ICategoryInputsTransformed {
  name: string;
  products: number[];
}

export interface IBrandInputs {
  name: string;
  image: File | null | undefined;
  products: IProductSizeOption[];
}

export interface IBrandInputsTransformed {
  name: string;
  image: File | null | undefined;
  products: number[];
}

export interface IAuthContext {
  user: UserModel | null;
  setUser: (user: UserModel | null) => void;
}

export interface IDashboardItem {
  icon: JSX.Element;
  title: string;
  value: string;
  level: TDashboardLevel;
  difference: string;
}

export interface IProductSizeOption {
  text: string;
  value: number;
}
