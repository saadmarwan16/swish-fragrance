import Link from "next/link";
import { FunctionComponent } from "react";
import Avatar from "../../../shared/components/Avatar";
import Routes from "../../../shared/constants/routes";
import { BASE_URL } from "../../../shared/constants/urls";
import getFormattedDate from "../../../shared/utils/getFormattedDate";
import { Orders } from "../data/models/dashboard_model";

interface AdminDashboardOrdersTableProps {
  orders: Orders;
}

const AdminDashboardOrdersTable: FunctionComponent<
  AdminDashboardOrdersTableProps
> = ({ orders }) => {
  return (
    <div className="flex flex-col w-full gap-6 p-2 border rounded-lg md:p-3 border-base-300 xl:w-2/3">
      <div className="flex justify-between">
        <h2 className="custom-heading2">Orders</h2>
        <Link href={Routes.ORDERS}>
          <a className="custom-subtitle1 hover:text-blue-500">See All</a>
        </Link>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Order</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.data.slice(0, 4).map((order) => {
              const { country, delivered_date, payment_status, total, user } =
                order.attributes;

              return (
                <tr key={order.id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <Avatar
                        alt="Order Customer Profile Image"
                        url={
                          user.data.attributes.image.data?.attributes.url
                            ? `${BASE_URL}${user.data.attributes.image.data?.attributes.url}`
                            : "/images/no_profile_image.webp"
                        }
                        width="w-12"
                      />
                      <div>
                        <div className="font-bold">
                          {user.data.attributes.name}
                        </div>
                        <div className="text-sm opacity-50">{country}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    GHC {total}
                    <br />
                    <span
                      className={`py-0.5 px-4 rounded-lg ${
                        payment_status === "Paid"
                          ? "bg-success text-success-content"
                          : "bg-error text-error-content"
                      }`}
                    >
                      {payment_status}
                    </span>
                  </td>
                  <td>{getFormattedDate(delivered_date)}</td>
                  <th>
                    <Link href={Routes.ORDER_DETAILS(order.id.toString())}>
                      <a className="btn btn-ghost btn-xs">details</a>
                    </Link>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboardOrdersTable;
