import Link from "next/link";
import { FunctionComponent } from "react";
import Avatar from "../../../../shared/components/Avatar";
import LogoAvatar from "../../../../shared/components/LogoAvatar";
import Routes from "../../../../shared/constants/routes";
import { BASE_URL } from "../../../../shared/constants/urls";
import getProductStockStatusColor from "../../../../shared/utils/getProductStockStatusColor";
import { ProductsModel } from "../products_model";

interface ProductsGridViewProps {
  products: ProductsModel;
}

const ProductsGridView: FunctionComponent<ProductsGridViewProps> = ({
  products,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {products.data.map(
        ({
          id,
          attributes: {
            name,
            in_stock,
            revenue_generated,
            number_sold,
            image,
            profit,
            restock_point,
          },
        }) => (
          <Link key={id} href={Routes.PRODUCT_DETAILS(id)}>
            <a className="custom-category-product-link">
              <div className="relative custom-category-product-container">
                <div
                  className={`w-1 p-1 rounded-full absolute right-2 top-2 ${getProductStockStatusColor(
                    in_stock,
                    restock_point
                  )}`}
                ></div>
                <div className="flex justify-center">
                  <Avatar
                    alt="Product Image"
                    width="w-14"
                    url={
                      image.data
                        ? `${BASE_URL}${image.data.attributes.url}`
                        : "/images/no_image.jpg"
                    }
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="custom-heading2 text-primary">{name}</p>
                  <div className="text-sm text-gray-500">
                    Re-stock point:{" "}
                    <span className="font-semibold !text-base-content">
                      {restock_point}
                    </span>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="text-lg font-semibold">
                      {in_stock} {""}
                    </span>
                    <span className="text-sm text-gray-500">in stock</span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold">
                      {number_sold} {""}
                    </span>
                    <span className="text-sm text-gray-500">sold</span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold">
                      GH¢{profit} {""}
                    </span>
                    <span className="text-sm text-gray-500">in profit</span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold">
                      GH¢{revenue_generated} {""}
                    </span>
                    <span className="text-sm text-gray-500">in revenue</span>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        )
      )}
    </div>
  );
};

export default ProductsGridView;
