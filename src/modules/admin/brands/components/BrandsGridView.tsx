import Link from "next/link";
import { FunctionComponent } from "react";
import Routes from "../../../../shared/constants/routes";
import getCategoryDetails from "../../../../shared/utils/getCategoryDetails";
import { BrandsModel } from "../brands_model";

interface BrandsGridViewProps {
  brands: BrandsModel;
}

const BrandsGridView: FunctionComponent<BrandsGridViewProps> = ({
  brands,
}) => {
  return (
    <div className="custom-grid-1234">
      {brands.data.map(({ id, attributes }) => {
        const { numberOfProducts, sold, revenue } = getCategoryDetails(
          attributes.products
        );

        return (
          <Link key={id} href={Routes.BRAND_DETAILS(id)}>
            <a className="custom-category-product-link">
              <div className="custom-category-product-container">
                <p className="custom-heading2 text-primary">
                  {attributes.name}
                </p>

                <div>
                  <div>
                    <span className="text-lg font-semibold">
                      {numberOfProducts} {""}
                    </span>
                    <span className="text-sm text-gray-500">product(s)</span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold">{sold} </span>
                    <span className="text-sm text-gray-500">sold</span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold">GH¢{revenue} </span>
                    <span className="text-sm text-gray-500">in revenue</span>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default BrandsGridView;
