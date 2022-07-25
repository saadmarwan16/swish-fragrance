import Link from "next/link";
import { FunctionComponent } from "react";
import Routes from "../../../../shared/constants/routes";
import getCategoryDetails from "../../../../shared/utils/getCategoryDetails";
import { CategoriesModel } from "../categories_model";

interface CategoriesGridViewProps {
  categories: CategoriesModel;
}

const CategoriesGridView: FunctionComponent<CategoriesGridViewProps> = ({
  categories,
}) => {
  return (
    <div className="custom-grid-1234">
      {categories.data.map(({ id, attributes }) => {
        const { profit, sold, revenue } = getCategoryDetails(
          attributes.products
        );

        return (
          <Link key={id} href={Routes.CATEGORY_DETAILS(id)}>
            <a className="custom-category-product-link">
              <div className="custom-category-product-container">
                <div className="flex flex-col justify-center">
                  <p className="custom-heading2 text-primary">
                    {attributes.name}
                  </p>
                  <div className="text-sm text-gray-500">
                    Items:{" "}
                    <span className="font-semibold !text-base-content">
                      {attributes.products.data.length}
                    </span>
                  </div>
                </div>

                <div>
                  <div>
                    <span className="text-lg font-semibold">{sold} </span>
                    <span className="text-sm text-gray-500">sold</span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold">GH¢{profit} </span>
                    <span className="text-sm text-gray-500">in profit</span>
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

export default CategoriesGridView;
