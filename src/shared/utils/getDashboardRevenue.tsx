import { Orders } from "../../modules/dashboard/data/models/dashboard_model";
import { IoPricetagsOutline } from "react-icons/io5";

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
  if (ordersSum >= previousOrdersSum) {
    difference = "+" + ((previousOrdersSum / ordersSum) * 100).toFixed(2);
  } else {
    difference = "-" + ((ordersSum / previousOrdersSum) * 100).toFixed(2);
  }

  return {
    icon: <IoPricetagsOutline />,
    title: "Revenue",
    value: `GHC ${ordersSum}`,
    increased: ordersSum > previousOrdersSum,
    difference,
  };
};

export default getDashboardRevenue;
