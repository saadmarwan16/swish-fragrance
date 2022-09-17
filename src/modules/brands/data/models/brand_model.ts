// To parse this data:
//
//   import { Convert, BrandModel } from "./file";
//
//   const brandModel = Convert.toBrandModel(json);

export interface BrandModel {
  data: Data;
  meta: Meta;
}

export interface Data {
  attributes: DataAttributes;
}

export interface DataAttributes {
  entity: Entity;
  all_products: AllProducts;
}

export interface AllProducts {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id: number;
  attributes: DatumAttributes;
}

export interface DatumAttributes {
  name: string;
}

export interface Meta {}

export interface Entity {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  image: Image | null;
  products: Product[];
}

export interface Image {
  id: number;
  url: string;
}

export interface Product {
  id: number;
  name: string;
}

// Converts JSON strings to/from your types
export class ConvertBrandModel {
  public static toBrandModel(json: string): BrandModel {
    return JSON.parse(json);
  }

  public static brandModelToJson(value: BrandModel): string {
    return JSON.stringify(value);
  }
}
