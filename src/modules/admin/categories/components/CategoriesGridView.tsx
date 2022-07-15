import Link from "next/link";
import { FunctionComponent } from "react";
import getCategoryDetails from "../../../../shared/utils/getCategoryDetails";
import { CategoriesModel } from "../categories_model";
import CategoriesTitleSearch from "./CategoriesTitleSearch";

interface CategoriesGridViewProps {
  categories: CategoriesModel;
}

const CategoriesGridView: FunctionComponent<CategoriesGridViewProps> = ({
  categories,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {categories.data.map(({ id, attributes }) => {
        const { numberOfProducts, sold, revenue } = getCategoryDetails(
          attributes.products
        );

        return (
          <Link key={id} href="/">
            <a className="border rounded-lg border-base-300 hover:border-secondary">
              <div className="flex flex-col items-center gap-4 p-4 text-center">
                <p className="text-lg font-semibold text-primary">
                  {attributes.name}
                </p>

                <div>
                  <div>
                    <span className="text-lg font-semibold">
                      {numberOfProducts}{" "}
                    </span>
                    <span className="text-sm text-gray-500">products</span>
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

export default CategoriesGridView;
