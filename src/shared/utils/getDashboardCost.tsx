import { Orders } from "../../modules/dashboard/data/models/dashboard_model";
import { IoPricetagOutline } from "react-icons/io5";

const getDashboardCost = (previousOrders: Orders, orders: Orders) => {
  let previousOrdersSum = 0;
  previousOrders.data.map((order) => {
    previousOrdersSum += order.attributes.cost_price;
  });

  let ordersSum = 0;
  orders.data.map((order) => {
    ordersSum += order.attributes.cost_price;
  });

  let difference;
  if (ordersSum >= previousOrdersSum) {
    difference = "+" + ((previousOrdersSum / ordersSum) * 100).toFixed(2);
  } else {
    difference = "-" + ((ordersSum / previousOrdersSum) * 100).toFixed(2);
  }

  return {
    icon: <IoPricetagOutline />,
    title: "Cost",
    value: `GHC ${ordersSum}`,
    increased: ordersSum > previousOrdersSum,
    difference,
  };
};

export default getDashboardCost;
