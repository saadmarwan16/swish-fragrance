// To parse this data:
//
//   import { Convert, BrandModel } from "./file";
//
//   const brandModel = Convert.toBrandModel(json);

export interface BrandModel {
  data: BrandModelData;
  meta: Meta;
}

export interface BrandModelData {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  image: Image;
  products: Products;
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

export interface Meta {}

// Converts JSON strings to/from your types
export class ConvertBrandModel {
  public static toBrandModel(json: string): BrandModel {
    return JSON.parse(json);
  }

  public static brandModelToJson(value: BrandModel): string {
    return JSON.stringify(value);
  }
}
