import { GetServerSideProps } from "next";
import { FunctionComponent, useState } from "react";
import ordersController from "../../../src/modules/admin/orders/orders_controller";
import { OrderModel } from "../../../src/modules/admin/orders/order_model";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import ErrorContent from "../../../src/shared/components/ErrorContent";
import SingleOrderContent from "../../../src/modules/admin/orders/components/SingleOrderContent";

interface OrderDetailsProps {
  id: string;
  order: OrderModel | null;
}

const OrderDetails: FunctionComponent<OrderDetailsProps> = (props) => {
  const [order, setOrder] = useState(props.order);

  return (
    <AdminLayout titlePrefix={`Order with order id of #${props.id}`}>
      <div className="">
        {!order ? (
          <ErrorContent
            title="Order"
            setContent={() =>
              ordersController.getOrder(props.id).then((res) => setOrder(res))
            }
          />
        ) : (
          <SingleOrderContent order={order} />
        )}
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id as string;
  const order = await ordersController.getOrder(id);

  return {
    props: {
      id,
      order,
    },
  };
};

export default OrderDetails;
