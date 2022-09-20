import { observer } from "mobx-react-lite";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import OrdersHeader from "../../../src/modules/orders/components/OrdersHeader";
import OrdersTableView from "../../../src/modules/orders/components/OrdersTableView";
import OrdersTabs from "../../../src/modules/orders/components/OrdersTabs";
import ordersController from "../../../src/modules/orders/controllers/orders_controller";
import { OrdersModel } from "../../../src/modules/orders/data/models/orders_model";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import EmptyContent from "../../../src/shared/components/EmptyContent";
import ErrorContent from "../../../src/shared/components/ErrorContent";
import LoaderContent from "../../../src/shared/components/LoaderContent";
import PaginationTabs from "../../../src/shared/components/PaginationTabs";
import { ErrorModel } from "../../../src/shared/data/models/errror_model";
import adminServerProps from "../../../src/shared/utils/adminServerProps";
import errorToast from "../../../src/shared/utils/errorToast";

interface OrdersPageProps {
  orders: OrdersModel | null;
  error: ErrorModel | null;
}

const Orders: NextPage<OrdersPageProps> = (props) => {
  const [orders, setOrders] = useState(props.orders);
  const [error, setError] = useState(props.error);

  return (
    <AdminLayout titlePrefix="Orders">
      <div>
        <div className="flex flex-col justify-between gap-2 pt-4 sm:flex-row sm:items-center">
          <p className="custom-heading1">Orders</p>
        </div>
        <p className="custom-subtitle1">Manage your orders to increase sales</p>
        <div className="custom-categories-products-container">
          {!orders ? (
            <ErrorContent
              title="brands"
              errorName={error?.name}
              errorMessage={error?.message}
              setContent={() =>
                ordersController.getAll().then((res) => {
                  const { error, orders } = res;
                  if (error) {
                    errorToast(error.name, error.message);
                    setError(error);

                    return;
                  }

                  setOrders(orders);
                })
              }
            />
          ) : (
            <>
              <OrdersHeader
                itemsCount={orders.data.length}
                pagination={orders.meta.pagination}
              />

              {ordersController.loading ? (
                <LoaderContent />
              ) : (
                <>
                  <OrdersTabs
                    setOrders={(filter) =>
                      ordersController.updateFilter(filter).then((res) => {
                        const { error, orders } = res;
                        setError(error);
                        setOrders(orders);
                      })
                    }
                  />

                  {orders.data.length === 0 ? (
                    <EmptyContent title="Orders" content="orders" />
                  ) : (
                    <>
                      <OrdersTableView orders={orders} />

                      <PaginationTabs
                        pagination={orders.meta.pagination}
                        setContent={(page) =>
                          ordersController.getAll(page).then((res) => {
                            const { error, orders } = res;
                            setError(error);
                            setOrders(orders);
                          })
                        }
                      />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return adminServerProps(ctx, async () => {
    return {
      props: await ordersController.getAll(),
    };
  });
};

export default observer(Orders);
