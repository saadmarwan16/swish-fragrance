import Link from "next/link";
import { FunctionComponent } from "react";
import getCategoryDetails from "../../../../shared/utils/getCategoryDetails";
import { CategoriesModel } from "../categories_model";

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
          <th>Remaining</th>
          <th>Sold</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        {categories.data.map(({ id, attributes }) => {
          const { numberOfProducts, sold, revenue } = getCategoryDetails(
            attributes.products
          );

          return (
            <Link key={id} href="/">
              <tr className="hover hover:cursor-pointer">
                <td>{attributes.name}</td>
                <td>{numberOfProducts}</td>
                <td>{sold}</td>
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
