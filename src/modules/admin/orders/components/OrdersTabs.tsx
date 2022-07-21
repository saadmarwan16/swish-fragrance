import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import OrdersTab from "./OrdersTab";

interface OrdersTabsProps {
  setOrders: (filter: string) => void;
}

const OrdersTabs: FunctionComponent<OrdersTabsProps> = ({ setOrders }) => {
  return (
    <div className="gap-2 pb-4 tabs">
      <OrdersTab title="All" filter="all" setOrders={setOrders} />
      <OrdersTab title="Dispatched" filter="dispatched" setOrders={setOrders} />
      <OrdersTab title="Pending" filter="pending" setOrders={setOrders} />
      <OrdersTab title="Completed" filter="completed" setOrders={setOrders} />
      <OrdersTab title="Processing" filter="processing" setOrders={setOrders} />
      <OrdersTab title="Cancelled" filter="cancelled" setOrders={setOrders} />
    </div>
  );
};

export default observer(OrdersTabs);
