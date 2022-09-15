import { Orders } from "../../modules/dashboard/data/models/dashboard_model";
import { IoPricetagsOutline } from "react-icons/io5";
import { TDashboardLevel } from "../types/types";
import { MdOutlineAttachMoney } from "react-icons/md";

const getDashboardProfit = (previousOrders: Orders, orders: Orders) => {
  let previousOrdersSum = 0;
  previousOrders.data.map((order) => {
    previousOrdersSum += order.attributes.total - order.attributes.cost_price;
  });

  let ordersSum = 0;
  orders.data.map((order) => {
    ordersSum += order.attributes.total - order.attributes.cost_price;
  });

  let difference;
  let level: TDashboardLevel;
  if (ordersSum > previousOrdersSum) {
    level = "increased";
    difference = "+" + ((previousOrdersSum / ordersSum) * 100).toFixed(2) + "%";
  } else if (previousOrdersSum > ordersSum) {
    level = "decreased";
    difference = "-" + ((ordersSum / previousOrdersSum) * 100).toFixed(2) + "%";
  } else {
    level = "maintained";
    difference = 0;
    difference = difference.toFixed(2) + "%";
  }

  return {
    icon: <MdOutlineAttachMoney />,
    title: "Profit",
    value: `GHC ${ordersSum}`,
    level,
    difference,
  };
};

export default getDashboardProfit;
