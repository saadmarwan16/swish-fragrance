import { GetServerSideProps } from "next";
import { FunctionComponent, useState } from "react";
import ordersController from "../../../src/modules/admin/orders/orders_controller";
import { OrderModel } from "../../../src/modules/admin/orders/order_model";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import ErrorContent from "../../../src/shared/components/ErrorContent";

interface OrderDetailsProps {
  id: string;
  order: OrderModel | null;
}

const OrderDetails: FunctionComponent<OrderDetailsProps> = (props) => {
  const [order, setOrder] = useState(props.order);

  return (
    <AdminLayout titlePrefix="Brand Details">
      <div className="">
        {!order ? (
          <ErrorContent
            title="Orde"
            setContent={() =>
              ordersController.getOrder(props.id).then((res) => setOrder(res))
            }
          />
        ) : (
          <div>
            <div>
                <p className="custom-heading2">ORDER ID: #{order.data.id}</p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const order = await ordersController.getOrder(query.id as string);

  return {
    props: {
      id: query.id,
      order,
    },
  };
};

export default OrderDetails;
