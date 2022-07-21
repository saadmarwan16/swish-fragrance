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
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  products: Products;
  image: Image;
}

export interface Image {
  data: ImageDatum[] | null;
}

export interface ImageDatum {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Formats {
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Products {
  data: ProductsDatum[];
}

export interface ProductsDatum {
  id: number;
  attributes: TentacledAttributes;
}

export interface TentacledAttributes {
  name: string;
  is_discounted: boolean;
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
export class ConvertBrandsModel {
  public static toBrandsModel(json: string): BrandsModel {
    return JSON.parse(json);
  }

  public static brandsModelToJson(value: BrandsModel): string {
    return JSON.stringify(value);
  }
}
