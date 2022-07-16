import Link from "next/link";
import { FunctionComponent } from "react";
import LogoAvatar from "../../../../shared/components/LogoAvatar";
import Routes from "../../../../shared/constants/routes";
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
          attributes: { name, in_stock, revenue_generated, number_sold },
        }) => (
          <Link key={id} href={Routes.PRODUCT_DETAILS(id)}>
            <a className="custom-category-product-link">
              <div className="custom-category-product-container">
                <div className="flex justify-center">
                  <LogoAvatar />
                </div>
                <div className="flex justify-center">
                  <p className="custom-heading2 text-primary">{name}</p>
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
