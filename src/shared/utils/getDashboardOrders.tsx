import { Orders } from "../../modules/dashboard/data/models/dashboard_model";
import { GiShoppingCart } from "react-icons/gi";
import { TDashboardLevel } from "../types/types";

const getDashboardOrders = (previousOrders: Orders, orders: Orders) => {
  const totalPreviousOrders = previousOrders.data.length;
  const totalOrders = orders.data.length;

  let difference;
  let level: TDashboardLevel;
  if (totalOrders > totalPreviousOrders) {
    level = "increased";
    difference =
      "+" + ((totalPreviousOrders / totalOrders) * 100).toFixed(2) + "%";
  } else if (totalPreviousOrders > totalOrders) {
    level = "decreased";
    difference =
      "-" + ((totalOrders / totalPreviousOrders) * 100).toFixed(2) + "%";
  } else {
    level = "maintained";
    difference = 0;
    difference = difference.toFixed(2) + "%";
  }

  return {
    icon: <GiShoppingCart />,
    title: "Orders",
    value: totalOrders.toString(),
    level,
    difference: difference,
  };
};

export default getDashboardOrders;
