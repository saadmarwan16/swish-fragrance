import { TOrderStatusKeys } from "../types/types";

const getOrderStatusColor = (key: TOrderStatusKeys, colorType: string) => {
  if (colorType === "border") {
    const orderStatusColors = {
      Pending: `border-warning`,
      Processing: "border-info",
      Dispatched: "border-success",
      Completed: "border-gray-400",
      Cancelled: "border-error",
    };

    return orderStatusColors[key];
  } else if (colorType === "bg") {
    const orderStatusColors = {
      Pending: `bg-warning`,
      Processing: "bg-info",
      Dispatched: "bg-success",
      Completed: "bg-gray-400",
      Cancelled: "bg-error",
    };

    return orderStatusColors[key];
  } else {
    const orderStatusColors = {
      Pending: `text-warning`,
      Processing: "text-info",
      Dispatched: "text-success",
      Completed: "text-gray-400",
      Cancelled: "text-error",
    };

    return orderStatusColors[key];
  }
};

export default getOrderStatusColor;
