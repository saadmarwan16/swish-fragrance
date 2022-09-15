import { Orders } from "../../modules/dashboard/data/models/dashboard_model";
import { IoPricetagOutline } from "react-icons/io5";
import { TDashboardLevel } from "../types/types";

const getDashboardCost = (previousOrders: Orders, orders: Orders) => {
  let previousOrdersSum = 0;
  previousOrders.data.forEach((order) => {
    previousOrdersSum += order.attributes.cost_price;
  });

  let ordersSum = 0;
  orders.data.forEach((order) => {
    ordersSum += order.attributes.cost_price;
  });

  let difference;
  let level: TDashboardLevel;
  if (ordersSum > previousOrdersSum) {
    level = "increased";
    difference = "+" + ((previousOrdersSum / ordersSum) * 100).toFixed(2) + '%';
  } else if (previousOrdersSum > ordersSum) {
    level = "decreased";
    difference = "-" + ((ordersSum / previousOrdersSum) * 100).toFixed(2) + '%';
  } else {
    level = "maintained";
    difference = 0;
    difference = difference.toFixed(2) + '%';
  }

  return {
    icon: <IoPricetagOutline />,
    title: "Cost",
    value: `GHC ${ordersSum}`,
    level,
    difference,
  };
};

export default getDashboardCost;
