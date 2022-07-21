// To parse this data:
//
//   import { Convert, HistoryModel } from "./file";
//
//   const historyModel = Convert.toHistoryModel(json);

export interface HistoryModel {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  content: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
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
export class ConvertHistoryModel {
  public static toHistoryModel(json: string): HistoryModel {
    return JSON.parse(json);
  }

  public static historyModelToJson(value: HistoryModel): string {
    return JSON.stringify(value);
  }
}
