import Link from "next/link";
import { FunctionComponent } from "react";
import LogoAvatar from "../../../../shared/components/LogoAvatar";
import Routes from "../../../../shared/constants/routes";
import getCategoryDetails from "../../../../shared/utils/getCategoryDetails";
import { BrandsModel } from "../brands_model";

interface BrandsTableViewProps {
  brands: BrandsModel;
}

const BrandsTableView: FunctionComponent<BrandsTableViewProps> = ({
  brands,
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
        {brands.data.map(({ id, attributes }) => {
          const { numberOfProducts, sold, revenue } = getCategoryDetails(
            attributes.products
          );

          return (
            <Link key={id} passHref={true} href={Routes.BRAND_DETAILS(id)}>
              <tr className="hover hover:cursor-pointer">
                <td>
                  <div className="flex items-center space-x-3">
                    <LogoAvatar />

                    <div>
                      <div className="font-bold">{attributes.name}</div>
                    </div>
                  </div>
                </td>
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

export default BrandsTableView;
