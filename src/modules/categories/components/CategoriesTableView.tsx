import Link from "next/link";
import { FunctionComponent } from "react";
import Routes from "../../../shared/constants/routes";
import getCategoryDetails from "../../../shared/utils/getCategoryDetails";
import { CategoriesModel } from "../data/models/categories_model";

interface CategoriesTableViewProps {
  categories: CategoriesModel;
}

const CategoriesTableView: FunctionComponent<CategoriesTableViewProps> = ({
  categories,
}) => (
  <div className="overflow-x-auto">
    <table className="table w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Sold</th>
          <th>Profit</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        {categories.data.map(({ id, attributes }) => {
          const { profit, sold, revenue } = getCategoryDetails(
            attributes.products
          );

          return (
            <Link key={id} href={Routes.CATEGORY_DETAILS(id)}>
              <tr className="hover hover:cursor-pointer">
                <td>
                  <div>
                    <div className="font-bold">{attributes.name}</div>
                    <div className="text-sm text-gray-500">
                      Items:{" "}
                      <span className="font-semibold !text-base-content">
                        {attributes.products.data.length}
                      </span>
                    </div>
                  </div>
                </td>
                <td>{sold}</td>
                <td>GH¢{profit}</td>
                <td>GH¢{revenue}</td>
              </tr>
            </Link>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default CategoriesTableView;
