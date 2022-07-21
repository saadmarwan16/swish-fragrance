import Link from "next/link";
import { FunctionComponent } from "react";
import LogoAvatar from "../../../../shared/components/LogoAvatar";
import Routes from "../../../../shared/constants/routes";
import { ProductsModel } from "../products_model";

interface ProductsTableViewProps {
  products: ProductsModel;
}

const ProductsTableView: FunctionComponent<ProductsTableViewProps> = ({
  products,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>In stock</th>
            <th>Sold</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {products.data.map(
            ({
              id,
              attributes: {
                name,
                number_sold,
                in_stock,
                revenue_generated,
                size
              },
            }) => (
              <Link key={id} href={Routes.PRODUCT_DETAILS(id)}>
                <tr className="hover hover:cursor-pointer">
                  <td>
                    <div className="flex items-center space-x-3">
                      <LogoAvatar />

                      <div>
                        <div className="font-bold">{name}</div>
                        <div className="text-sm opacity-50">{size}</div>
                      </div>
                    </div>
                  </td>
                  <td>{in_stock}</td>
                  <td>{number_sold}</td>
                  <td>GH¢{revenue_generated}</td>
                </tr>
              </Link>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTableView;
