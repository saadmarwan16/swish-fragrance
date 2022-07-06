import type { NextPage } from "next";
import AdminLayout from "../../src/shared/components/AdminLayout";

interface OrdersPageProps {}

const Orders: NextPage<OrdersPageProps> = ({}) => {
  return (
    <AdminLayout titlePrefix="Orders">
      <div className="text-4xl font-semibold">Orders View is working</div>
    </AdminLayout>
  );
};

export default Orders;
