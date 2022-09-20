// To parse this data:
//
//   import { Convert, ProductModel } from "./file";
//
//   const productModel = Convert.toProductModel(json);

export interface ProductModel {
  data: ProductModelData;
  meta: Meta;
}

export interface ProductModelData {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
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
export class ConvertProductModel {
  public static toProductModel(json: string): ProductModel {
    return JSON.parse(json);
  }

  public static productModelToJson(value: ProductModel): string {
    return JSON.stringify(value);
  }
}
