import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import ordersController from "../orders_controller";

interface OrdersTabProps {
  title: string;
  setOrders: (filter: string) => void;
}

const OrdersTab: FunctionComponent<OrdersTabProps> = ({
  title,
  setOrders,
}) => {
  return (
    <a
      className={`tab tab-bordered ${
        ordersController.filter === title &&
        " tab-active !border-primary text-primary"
      }`}
      onClick={() => setOrders(title)}
    >
      {title}
    </a>
  );
};

export default observer(OrdersTab);
