// To parse this data:
//
//   import { Convert, ProductsModel } from "./file";
//
//   const productsModel = Convert.toProductsModel(json);

export interface ProductsModel {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id:         number;
  attributes: DatumAttributes;
}

export interface DatumAttributes {
  name:              string;
  in_stock:          number;
  number_sold:       number;
  revenue_generated: number;
  createdAt:         Date;
  updatedAt:         Date;
  publishedAt:       Date;
  discount:          number;
  selling_price:     number;
  profit:     number;
  size:              string;
  cost_price:        number;
  restock_point:     number;
  image:             Image;
}

export interface Image {
  data: Data | null;
}

export interface Data {
  id:         number;
  attributes: DataAttributes;
}

export interface DataAttributes {
  url: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page:      number;
  pageSize:  number;
  pageCount: number;
  total:     number;
}

// Converts JSON strings to/from your types
export class ConvertProductsModel {
  public static toProductsModel(json: string): ProductsModel {
      return JSON.parse(json);
  }

  public static productsModelToJson(value: ProductsModel): string {
      return JSON.stringify(value);
  }
}
