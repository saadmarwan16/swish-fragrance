import dayjs from "dayjs";
import Link from "next/link";
import { FunctionComponent } from "react";
import LogoAvatar from "../../../../shared/components/LogoAvatar";
import Routes from "../../../../shared/constants/routes";
import getOrderStatusColor from "../../../../shared/utils/getOrderStatusColor";
import { OrdersModel } from "../orders_model";

interface OrdersTableViewProps {
  orders: OrdersModel;
}

const OrdersTableView: FunctionComponent<OrdersTableViewProps> = ({
  orders,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Payment</th>
            <th>Payment Status</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.data.map(
            ({
              id,
              attributes: {
                amount,
                createdAt,
                payment_method,
                payment_status,
                products,
                status,
              },
            }) => (
              <Link key={id} href={Routes.ORDER_DETAILS(id)}>
                <tr className="hover hover:cursor-pointer">
                  <td>
                    <div className="flex items-center space-x-3">
                      <LogoAvatar />

                      <div>
                        <div className="font-bold">Abdul Rahman</div>
                        <div className="text-sm text-gray-500">
                          items:{" "}
                          <span className="font-semibold !text-base-content">
                            {products.data.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>GH¢{amount}</td>
                  <td>{dayjs(createdAt).format("DD MMM YYYY")}</td>
                  <td>{payment_method}</td>
                  <td>
                    <span
                      className={`py-1 px-2 rounded-lg ${
                        payment_status === "Paid"
                          ? "bg-success text-success-content"
                          : "bg-error text-error-content"
                      }`}
                    >
                      {payment_status}
                    </span>
                  </td>
                  <td>
                    <div
                      className={`flex items-center gap-1 ${getOrderStatusColor(
                        status,
                        "text"
                      )}`}
                    >
                      <span
                        className={`p-1 border rounded-full custom-flex-center ${getOrderStatusColor(
                          status,
                          "border"
                        )}`}
                      >
                        <div
                          className={`p-1.5 rounded-full ${getOrderStatusColor(
                            status,
                            "bg"
                          )}`}
                        ></div>
                      </span>
                      <span>{status}</span>
                    </div>
                  </td>
                </tr>
              </Link>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTableView;
