import { Orders } from "../../modules/dashboard/data/models/dashboard_model";
import { IoPricetagsOutline } from "react-icons/io5";
import { TDashboardLevel } from "../types/types";

const getDashboardRevenue = (previousOrders: Orders, orders: Orders) => {
  let previousOrdersSum = 0;
  previousOrders.data.map((order) => {
    previousOrdersSum += order.attributes.total;
  });

  let ordersSum = 0;
  orders.data.map((order) => {
    ordersSum += order.attributes.total;
  });

  let difference;
  let level: TDashboardLevel;
  console.log(ordersSum);
  console.log(previousOrdersSum);
  if (ordersSum > previousOrdersSum && ordersSum > 0 && previousOrdersSum > 0) {
    level = "increased";
    difference = "+" + ((previousOrdersSum / ordersSum) * 100).toFixed(2) + "%";
  } else if (
    previousOrdersSum > ordersSum &&
    ordersSum > 0 &&
    previousOrdersSum > 0
  ) {
    level = "decreased";
    difference = "-" + ((ordersSum / previousOrdersSum) * 100).toFixed(2) + "%";
  } else {
    level = "maintained";
    difference = 0;
    difference = difference.toFixed(2) + "%";
  }

  return {
    icon: <IoPricetagsOutline />,
    title: "Revenue",
    value: `GHC ${ordersSum}`,
    level,
    difference,
  };
};

export default getDashboardRevenue;
