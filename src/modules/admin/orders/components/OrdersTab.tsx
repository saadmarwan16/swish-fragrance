import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import ordersController from "../orders_controller";

interface OrdersTabProps {
  title: string;
  filter: string;
  setOrders: (filter: string) => void;
}

const OrdersTab: FunctionComponent<OrdersTabProps> = ({
  title,
  filter,
  setOrders,
}) => {
  return (
    <a
      className={`tab tab-bordered ${
        ordersController.filter === filter &&
        " tab-active !border-primary text-primary"
      }`}
      onClick={() => setOrders(filter)}
    >
      {title}
    </a>
  );
};

export default observer(OrdersTab);
