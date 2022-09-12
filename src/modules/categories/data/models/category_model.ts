// To parse this data:
//
//   import { Convert, CategoryModel } from "./file";
//
//   const categoryModel = Convert.toCategoryModel(json);

export interface CategoryModel {
  data: CategoryModelData;
  meta: Meta;
}

export interface CategoryModelData {
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
  data: Datum[];
}

export interface Datum {
  id: number;
  attributes: DatumAttributes;
}

export interface DatumAttributes {
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

export interface Meta {}

// Converts JSON strings to/from your types
export class ConvertCategoryModel {
  public static toCategoryModel(json: string): CategoryModel {
    return JSON.parse(json);
  }

  public static categoryModelToJson(value: CategoryModel): string {
    return JSON.stringify(value);
  }
}
