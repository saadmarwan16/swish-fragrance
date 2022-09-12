import Link from "next/link";
import { FunctionComponent } from "react";
import Avatar from "../../../shared/components/Avatar";
import Routes from "../../../shared/constants/routes";
import { BASE_URL } from "../../../shared/constants/urls";
import getCategoryDetails from "../../../shared/utils/getCategoryDetails";
import { BrandsModel } from "../data/models/brands_model";

interface BrandsTableViewProps {
  brands: BrandsModel;
}

const BrandsTableView: FunctionComponent<BrandsTableViewProps> = ({
  brands,
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
        {brands.data.map(({ id, attributes }) => {
          const { sold, revenue, profit } = getCategoryDetails(
            attributes.products
          );

          return (
            <tr key={id} className="hover">
              <td>
                <Link passHref={true} href={Routes.BRAND_DETAILS(id)}>
                  <a>
                    <div className="flex items-center space-x-3 hover:cursor-pointer hover:text-primary">
                      <Avatar
                        alt="Brand Image"
                        url={
                          attributes.image.data
                            ? `${BASE_URL}${attributes.image.data.attributes.url}`
                            : "/images/no_image.jpg"
                        }
                        width="w-14"
                      />

                      <div>
                        <div className="font-bold">{attributes.name}</div>
                        <div className="text-sm text-gray-500">
                          Items:{" "}
                          <span className="font-semibold !text-base-content">
                            {attributes.products.data.length}
                          </span>
                        </div>
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

export default BrandsTableView;
