import { Orders } from "../../modules/dashboard/data/models/dashboard_model";
import { TDashboardLevel } from "../types/types";
import { AiOutlineShopping } from "react-icons/ai";

const getDashboardProducts = (previousOrders: Orders, orders: Orders) => {
  let totalPreviousProducts = 0;
  let totalProducts = 0;

  previousOrders.data.forEach((order) => {
    totalPreviousProducts += order.attributes.products.data.length;
  });

  orders.data.forEach((order) => {
    totalProducts += order.attributes.products.data.length;
  });

  let difference;
  let level: TDashboardLevel;
  if (totalProducts > totalPreviousProducts) {
    level = "increased";
    difference =
      "+" + ((totalPreviousProducts / totalProducts) * 100).toFixed(2) + "%";
  } else if (totalPreviousProducts > totalProducts) {
    level = "decreased";
    difference =
      "-" + ((totalProducts / totalPreviousProducts) * 100).toFixed(2) + "%";
  } else {
    level = "maintained";
    difference = 0;
    difference = difference.toFixed(2) + "%";
  }

  return {
    icon: <AiOutlineShopping />,
    title: "Products",
    value: totalProducts.toString(),
    level,
    difference: difference,
  };
};

export default getDashboardProducts;
