import Link from "next/link";
import { FunctionComponent } from "react";
import Avatar from "../../../shared/components/Avatar";
import Routes from "../../../shared/constants/routes";
import { BASE_URL } from "../../../shared/constants/urls";
import { FluffyProducts } from "../data/models/dashboard_model";

interface AdminDashboardProductsListProps {
  products: FluffyProducts;
}

const AdminDashboardProductsList: FunctionComponent<
  AdminDashboardProductsListProps
> = ({ products }) => {
  return (
    <div className="flex flex-col w-full gap-6 p-2 border rounded-lg md:p-3 border-base-300 xl:w-1/3">
      <div className="flex justify-between">
        <h2 className="custom-heading2">Top Selling Products</h2>
        <Link href={Routes.PRODUCTS}>
          <a className="custom-subtitle1 hover:text-blue-500">See All</a>
        </Link>
      </div>

      {products.data.map((product) => {
        const { image, name, number_sold, selling_price } = product.attributes;
        return (
          <div key={product.id} className="flex items-center justify-between">
            <div className="flex gap-3">
              <Avatar
                alt="Order Customer Profile Image"
                url={
                  image.data?.attributes.url
                    ? `${BASE_URL}${image.data?.attributes.url}`
                    : "/images/no_profile_image.webp"
                }
                width="w-12"
              />

              <div className="flex flex-col justify-center">
                <Link href={Routes.PRODUCT_DETAILS(product.id.toString())}>
                  <a className="font-semibold hover:text-primary">{name}</a>
                </Link>
                <small className="text-gray-500">
                  Price: GHC {selling_price}
                </small>
              </div>
            </div>

            <small className="px-3 py-1 rounded-lg bg-base-200">
              {number_sold} sales
            </small>
          </div>
        );
      })}
    </div>
  );
};

export default AdminDashboardProductsList;
