import { GrHistory, GrUserAdmin } from "react-icons/gr";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import Routes from "../constants/routes";

const adminIsActive = (path: string) => {
  return [
    {
      title: "Dashboard",
      icon: <AiOutlineDashboard />,
      route: Routes.ADMIN_DASHBOARD,
      isActive: path === Routes.ADMIN_DASHBOARD,
    },
    {
      title: "Products",
      icon: <FaShoppingBag />,
      route: Routes.PRODUCTS,
      isActive: path === Routes.PRODUCTS,
    },
    {
      title: "Orders",
      icon: <FaShoppingCart />,
      route: Routes.ORDERS,
      isActive: path === Routes.ORDERS,
    },
    {
      title: "History",
      icon: <GrHistory />,
      route: Routes.HISTORY,
      isActive: path === Routes.HISTORY,
    },
    {
      title: "Admins",
      icon: <GrUserAdmin />,
      route: Routes.ADMINS,
      isActive: path === Routes.ADMINS,
    },
  ];
};

export default adminIsActive;
