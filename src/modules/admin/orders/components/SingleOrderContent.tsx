import { FunctionComponent, useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import getFormattedDate from "../../../../shared/utils/getFormattedDate";
import { OrderModel } from "../order_model";
import getOrderStatusColor from "../../../../shared/utils/getOrderStatusColor";
import { BASE_URL } from "../../../../shared/constants/urls";
import Avatar from "../../../../shared/components/Avatar";
import getIsDateBefore from "../../../../shared/utils/getIsDateBefore";
import ordersController from "../orders_controller";
import { TOrderStatusKeys } from "../../../../shared/types/types";

interface SingleOrderContentProps {
  order: OrderModel;
}

const SingleOrderContent: FunctionComponent<SingleOrderContentProps> = (
  props
) => {
  const [order, setOrder] = useState(props.order);
  const {
    data: {
      id,
      attributes: {
        createdAt,
        delivery_date,
        status,
        payment_method,
        payment_status,
        city,
        country,
        region,
        address,
        total,
        sub_total,
        discount,
        delivery_cost,
        products,
        user: {
          data: {
            attributes: { email, image, name, number, username },
          },
        },
      },
    },
  } = order;

  const updateOrderStatus = (id: number, status: TOrderStatusKeys) => {
    ordersController.updateOrderStatus(id, status).then((res) => {
      if (res !== null) {
        setOrder(res);
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:gap-3 sm:justify-between">
        <p className="custom-heading2">ORDER ID: #{id}</p>
        <div className="flex justify-end">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="normal-case btn btn-secondary btn-outline"
            >
              Update status to:
            </label>
            <ul
              tabIndex={0}
              className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={() => updateOrderStatus(id, "Pending")}>Pending</a>
              </li>
              <li>
                <a onClick={() => updateOrderStatus(id, "Processing")}>
                  Processing
                </a>
              </li>
              <li>
                <a onClick={() => updateOrderStatus(id, "Dispatched")}>
                  Dispatched
                </a>
              </li>
              <li>
                <a onClick={() => updateOrderStatus(id, "Completed")}>
                  Completed
                </a>
              </li>
              <li>
                <a onClick={() => updateOrderStatus(id, "Cancelled")}>
                  Cancelled
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:gap-5 sm:flex-row">
        <span className="text-sm sm:text-base">
          <span className="text-gray-500">Order date: </span>
          {getFormattedDate(createdAt)}
        </span>
        <div
          className={`flex items-center gap-2 text-sm sm:text-base ${
            getIsDateBefore(delivery_date) ? "text-success" : "text-error"
          }`}
        >
          <FaShippingFast className="text-xl sm:text-2xl" />
          <span>Estimated delivery: {getFormattedDate(delivery_date)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-6 sm:mt-8 sm:flex-row">
        <div className="flex-grow">
          <p className="mb-3 custom-heading2">Recipient Information</p>
          <div className="flex items-center gap-3">
            <Avatar
              alt="Logo"
              width="w-20"
              url={
                image.data
                  ? `${BASE_URL}${image.data.attributes.url}`
                  : "/images/no_profile_image.webp"
              }
            />
            <div>
              <p className="font-semibold">{name}</p>
              <p className="custom-subtitle2">{email}</p>
              <p className="text-sm">{number}</p>
              <p className="text-sm text-primary">@{username}</p>
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <p className="mb-3 custom-heading2">Order and Payment</p>
          <div>
            <div className="flex items-center gap-3">
              <span className="custom-subtitle2">Order Status:</span>
              <span className={`${getOrderStatusColor(status, "text")}`}>
                {status}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="custom-subtitle2">Payment Status:</span>
              <span
                className={`${
                  payment_status === "Paid" ? "text-success" : "text-error"
                }`}
              >
                {payment_status}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="custom-subtitle2">Payment Method:</span>
              <span>{payment_method}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        <p className="custom-heading2">Products</p>
        <div className="flex flex-wrap gap-4">
          {products.data.map(
            ({ id, attributes: { image, name, selling_price } }) => (
              <div key={id}>
                <div className="items-start mb-2 stack">
                  <span className="flex justify-end mt-6 mr-6 font-semibold">
                    ${selling_price}
                  </span>
                  <Avatar
                    alt="Product"
                    url={
                      image.data
                        ? `${BASE_URL}${image.data.attributes.url}`
                        : "/images/no_image.jpg"
                    }
                    width="w-52"
                  />
                </div>
                <p>{name}</p>
                <p className="custom-subtitle2">Quantity - 1</p>
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-6 sm:mt-8 sm:flex-row">
        <div className="flex-grow">
          <p className="mb-3 sm:mb-4 custom-heading2">Shipping Information</p>
          <div className="flex flex-col gap-2">
            <div>
              <p className="custom-subtitle2">Address</p>
              <p className="w-4/5 sm:w-3/4 md:w-5/6 lg:w-1/2">{address}</p>
            </div>
            <div className="flex gap-2">
              <p>
                <span className="custom-subtitle2">Country: </span>
                {country}
              </p>
            </div>
            <div className="flex gap-2">
              <p>
                <span className="custom-subtitle2">Region: </span>
                {region}
              </p>
            </div>
            <div className="flex gap-2">
              <p>
                <span className="custom-subtitle2">City: </span> {city}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <p className="mb-3 custom-heading2 sm:mb-4">Order Summary</p>
          <div className="flex flex-col gap-2 sm:w-4/5 md:w-3/4 lg:w-2/3">
            <div className="flex justify-between text-gray-600">
              <p>Subtotal</p>
              <p>${sub_total}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <p>Discount</p>
              <p>- ${discount}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <p>Delivery</p>
              <p>+ ${delivery_cost}</p>
            </div>
            <div className="my-0 divider"></div>
            <div className="flex justify-between">
              <p>Total</p>
              <p className="font-semibold">${total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderContent;
