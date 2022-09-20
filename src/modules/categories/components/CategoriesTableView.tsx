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
    <table className="table w-full table-compact">
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
            <tr key={id} className="hover">
              <td>
                <Link href={Routes.CATEGORY_DETAILS(id.toString())}>
                  <a>
                    <div className=" hover:cursor-pointer hover:text-primary">
                      <div className="font-bold">{attributes.name}</div>
                      <div className="text-sm text-gray-500">
                        Items:{" "}
                        <span className="font-semibold !text-base-content">
                          {attributes.products.data.length}
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              </td>
              <td>{sold}</td>
              <td>GH¢{profit}</td>
              <td>GH¢{revenue}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default CategoriesTableView;
