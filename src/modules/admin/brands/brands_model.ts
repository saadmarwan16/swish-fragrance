// To parse this data:
//
//   import { Convert, BrandsModel } from "./file";
//
//   const brandsModel = Convert.toBrandsModel(json);

export interface BrandsModel {
  data: BrandsModelDatum[];
  meta: Meta;
}

export interface BrandsModelDatum {
  id:         number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  name:        string;
  createdAt:   Date;
  updatedAt:   Date;
  publishedAt: Date;
  image:       Image;
  products:    Products;
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

export interface Products {
  data: ProductsDatum[];
}

export interface ProductsDatum {
  id:         number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  name:              string;
  in_stock:          number;
  number_sold:       number;
  revenue_generated: number;
  createdAt:         Date;
  updatedAt:         Date;
  publishedAt:       Date;
  discount:          number;
  selling_price:     number;
  size:              string;
  cost_price:        number;
  restock_point:     number;
  profit:            number;
  image:             Image;
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
export class ConvertBrandsModel {
  public static toBrandsModel(json: string): BrandsModel {
      return JSON.parse(json);
  }

  public static brandsModelToJson(value: BrandsModel): string {
      return JSON.stringify(value);
  }
}
