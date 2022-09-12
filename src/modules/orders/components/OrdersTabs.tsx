import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import OrdersTab from "./OrdersTab";

interface OrdersTabsProps {
  setOrders: (filter: string) => void;
}

const OrdersTabs: FunctionComponent<OrdersTabsProps> = ({ setOrders }) => {
  return (
    <div className="gap-2 pb-4 tabs">
      <OrdersTab title="All" setOrders={setOrders} />
      <OrdersTab title="Dispatched" setOrders={setOrders} />
      <OrdersTab title="Pending" setOrders={setOrders} />
      <OrdersTab title="Completed" setOrders={setOrders} />
      <OrdersTab title="Processing" setOrders={setOrders} />
      <OrdersTab title="Cancelled" setOrders={setOrders} />
    </div>
  );
};

export default observer(OrdersTabs);
