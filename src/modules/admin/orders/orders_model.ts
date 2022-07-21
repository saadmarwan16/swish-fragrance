// To parse this data:
//
//   import { Convert, OrdersModel } from "./file";
//
//   const ordersModel = Convert.toOrdersModel(json);

import { TOrderStatusKeys } from "../../../shared/types/types";

export interface OrdersModel {
    data: OrdersModelDatum[];
    meta: Meta;
}

export interface OrdersModelDatum {
    id:         number;
    attributes: PurpleAttributes;
}

export interface PurpleAttributes {
    amount:         number;
    payment_method: string;
    status:         TOrderStatusKeys;
    // status:         string;
    createdAt:      Date;
    updatedAt:      Date;
    publishedAt:    Date;
    payment_status: string;
    address:        null | string;
    city:           null | string;
    region:         null | string;
    country:        string;
    products:       Products;
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
    is_discounted:     boolean;
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
export class ConvertOrdersModel {
    public static toOrdersModel(json: string): OrdersModel {
        return JSON.parse(json);
    }

    public static ordersModelToJson(value: OrdersModel): string {
        return JSON.stringify(value);
    }
}
