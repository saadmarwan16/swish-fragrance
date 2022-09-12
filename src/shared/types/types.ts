import { HistoryModel } from "../../modules/history/data/models/history_model";
import { NotificationsModel } from "../../modules/notifications/data/models/notifications_model";
import { ErrorModel } from "../data/models/errror_model";

export type NewProductFieldType =
  | "name"
  | "number_sold"
  | "revenue_generated"
  | "discount"
  | "selling_price"
  | "size"
  | "cost_price"
  | "restock_point"
  | "in_stock"
  | "profit";

export type TOrderStatusKeys =
  | "Pending"
  | "Processing"
  | "Dispatched"
  | "Completed"
  | "Cancelled";
