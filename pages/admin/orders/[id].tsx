import { GetServerSideProps } from "next";
import { FunctionComponent, useState } from "react";
import SingleOrderContent from "../../../src/modules/orders/components/SingleOrderContent";
import orderController from "../../../src/modules/orders/controllers/order_controller";
import { OrderModel } from "../../../src/modules/orders/data/models/order_model";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import ErrorContent from "../../../src/shared/components/ErrorContent";
import { ErrorModel } from "../../../src/shared/data/models/errror_model";

interface OrderDetailsProps {
  id: string;
  order: OrderModel | null;
  error: ErrorModel | null;
}

const OrderDetails: FunctionComponent<OrderDetailsProps> = (props) => {
  const [order, setOrder] = useState(props.order);
  const [error, setError] = useState(props.error);

  return (
    <AdminLayout titlePrefix={`Order with order id of #${props.id}`}>
      <div className="">
        {!order ? (
          <ErrorContent
            title="Order"
            errorName={error?.name}
            errorMessage={error?.message}
            setContent={() => {
              orderController.getOne(props.id).then((res) => {
                const { error, order } = res;
                setError(error);
                setOrder(order);
              });
            }}
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
  const results = await orderController.getOne(id);

  return {
    props: {
      id,
      ...results,
    },
  };
};

export default OrderDetails;
