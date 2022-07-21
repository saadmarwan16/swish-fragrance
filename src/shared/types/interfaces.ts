export interface ILoginInputs {
  identifier: string;
  password: string;
}

export interface NewProductInputs {
  name: string;
  images: string[];
  number_sold: number;
  revenue_generated: number;
  discount: number;
  selling_price: number;
  size: string;
  cost_price: number;
  restock_point: number;
  is_discounted: boolean;
  in_stock: number;
  brand: number;
  categories: {
    name: "string";
  }[];
  // categories: number[];
}
