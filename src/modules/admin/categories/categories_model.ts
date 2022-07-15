// To parse this data:
//
//   import { Convert, CategoriesModel } from "./file";
//
//   const categoriesModel = Convert.toCategoriesModel(json);

export interface CategoriesModel {
  data: CategoriesModelDatum[];
  meta: Meta;
}

export interface CategoriesModelDatum {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
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
  is_discounted: boolean;
  starting_price: number;
  in_stock: number;
  number_sold: number;
  revenue_generated: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  discount: number;
  gender: string;
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
export class ConvertCategories {
  public static toCategoriesModel(json: string): CategoriesModel {
    return JSON.parse(json);
  }

  public static categoriesModelToJson(value: CategoriesModel): string {
    return JSON.stringify(value);
  }
}
