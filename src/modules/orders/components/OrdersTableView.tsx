import Link from "next/link";
import { FunctionComponent } from "react";
import Avatar from "../../../shared/components/Avatar";
import Routes from "../../../shared/constants/routes";
import { BASE_URL } from "../../../shared/constants/urls";
import getFormattedDate from "../../../shared/utils/getFormattedDate";
import getOrderStatusColor from "../../../shared/utils/getOrderStatusColor";
import { OrdersModel } from "../data/models/orders_model";

interface OrdersTableViewProps {
  orders: OrdersModel;
}

const OrdersTableView: FunctionComponent<OrdersTableViewProps> = ({
  orders,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full table-compact">
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Total</th>
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
                total,
                createdAt,
                payment_method,
                payment_status,
                products,
                status,
                user,
              },
            }) => (
              <tr key={id} className="hover">
                <td>
                  <Link key={id} href={Routes.ORDER_DETAILS(id.toString())}>
                    <a>
                      <div className="flex items-center space-x-3 hover:cursor-pointer hover:text-primary">
                        <Avatar
                          alt="Product Author Image"
                          url={
                            user.data.attributes.image.data
                              ? `${BASE_URL}${user.data.attributes.image.data.attributes.url}`
                              : "/images/no_profile_image.webp"
                          }
                          width="w-14"
                        />

                        <div>
                          <div className="font-bold">
                            {user.data.attributes.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Items:{" "}
                            <span className="font-semibold !text-base-content">
                              {products.data.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </td>
                <td>GH¢{total}</td>
                <td>{getFormattedDate(createdAt)}</td>
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
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTableView;
