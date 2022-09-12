// To parse this data:
//
//   import { Convert, NotificationsModel } from "./file";
//
//   const notificationsModel = Convert.toNotificationsModel(json);

export interface NotificationsModel {
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
export class ConvertNotificationsModel {
  public static toNotificationsModel(json: string): NotificationsModel {
    return JSON.parse(json);
  }

  public static notificationsModelToJson(value: NotificationsModel): string {
    return JSON.stringify(value);
  }
}
