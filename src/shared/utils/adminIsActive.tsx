import { GrHistory } from "react-icons/gr";
import { AiOutlineDashboard, AiOutlineGroup } from "react-icons/ai";
import { FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import Routes from "../constants/routes";
import { GiPerfumeBottle } from "react-icons/gi";

const adminIsActive = (path: string) => {
  return [
    {
      title: "Dashboard",
      icon: <AiOutlineDashboard />,
      route: Routes.ADMIN_DASHBOARD,
      isActive: path === Routes.ADMIN_DASHBOARD,
    },
    {
      title: "Brands",
      icon: <GiPerfumeBottle />,
      route: Routes.BRANDS,
      isActive: path === Routes.BRANDS,
    },
    {
      title: "Categories",
      icon: <AiOutlineGroup />,
      route: Routes.CATEGORIES,
      isActive: path === Routes.CATEGORIES,
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
  ];
};

export default adminIsActive;
