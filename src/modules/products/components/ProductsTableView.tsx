import Link from "next/link";
import { FunctionComponent } from "react";
import Avatar from "../../../shared/components/Avatar";
import Routes from "../../../shared/constants/routes";
import { BASE_URL } from "../../../shared/constants/urls";
import getProductStockStatusColor from "../../../shared/utils/getProductStockStatusColor";
import { ProductsModel } from "../data/models/products_model";

interface ProductsTableViewProps {
  products: ProductsModel;
}

const ProductsTableView: FunctionComponent<ProductsTableViewProps> = ({
  products,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>In stock</th>
            <th>Sold</th>
            <th>Profit</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {products.data.map(
            ({
              id,
              attributes: {
                name,
                number_sold,
                in_stock,
                revenue_generated,
                profit,
                restock_point,
                image,
              },
            }) => (
              <Link key={id} href={Routes.PRODUCT_DETAILS(id)}>
                <tr className="hover hover:cursor-pointer">
                  <td className="w-4 px-2">
                    <div
                      className={`w-1 p-1 rounded-full ${getProductStockStatusColor(
                        in_stock,
                        restock_point
                      )}`}
                    ></div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <Avatar
                        alt="Product Image"
                        width="w-14"
                        url={
                          image.data
                            ? `${BASE_URL}${image.data.attributes.url}`
                            : "/images/no_image.jpg"
                        }
                      />

                      <div>
                        <div className="font-bold">{name}</div>
                        <div className="text-sm text-gray-500">
                          Re-stock point:{" "}
                          <span className="font-semibold !text-base-content">
                            {restock_point}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{in_stock}</td>
                  <td>{number_sold}</td>
                  <td>GH¢{profit}</td>
                  <td>GH¢{revenue_generated}</td>
                </tr>
              </Link>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTableView;
