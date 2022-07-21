import { TOrderStatusKeys } from "../types/types";

const getOrderStatusColor = (key: TOrderStatusKeys, colorType: string) => {
  if (colorType === "border") {
    const orderStatusColors = {
      pending: `border-warning`,
      processing: "border-info",
      dispatched: "border-success",
      completed: "border-gray-400",
      cancelled: "border-error",
    };

    return orderStatusColors[key];
  } else if (colorType === "bg") {
    const orderStatusColors = {
      pending: `bg-warning`,
      processing: "bg-info",
      dispatched: "bg-success",
      completed: "bg-gray-400",
      cancelled: "bg-error",
    };

    return orderStatusColors[key];
  } else {
    const orderStatusColors = {
      pending: `text-warning`,
      processing: "text-info",
      dispatched: "text-success",
      completed: "text-gray-400",
      cancelled: "text-error",
    };

    return orderStatusColors[key];
  }
};

export default getOrderStatusColor;
