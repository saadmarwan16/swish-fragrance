export interface ILoginInputs {
  identifier: string;
  password: string;
}

export interface INewProductInputs {
  name: string;
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

export interface INewBrandInputs {
  name: string;
}

export interface IImageDetails {
  id: number;
  url: string;
}
