// To parse this data:
//
//   import { Convert, CategoryModel } from "./file";
//
//   const categoryModel = Convert.toCategoryModel(json);

export interface CategoryModel {
  data: Data;
  meta: Meta;
}

export interface Data {
  attributes: DataAttributes;
}

export interface DataAttributes {
  entity:       Entity;
  all_products: AllProducts;
}

export interface AllProducts {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id:         number;
  attributes: DatumAttributes;
}

export interface DatumAttributes {
  name: string;
}

export interface Meta {
}

export interface Entity {
  id:          number;
  name:        string;
  createdAt:   Date;
  updatedAt:   Date;
  publishedAt: Date;
  products:    Product[];
}

export interface Product {
  id:   number;
  name: string;
}

// Converts JSON strings to/from your types
export class ConvertCategoryModel {
  public static toCategoryModel(json: string): CategoryModel {
      return JSON.parse(json);
  }

  public static categoryModelToJson(value: CategoryModel): string {
      return JSON.stringify(value);
  }
}
