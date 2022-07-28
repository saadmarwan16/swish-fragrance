import Link from "next/link";
import { FunctionComponent } from "react";
import Avatar from "../../../shared/components/Avatar";
import Routes from "../../../shared/constants/routes";
import { BASE_URL } from "../../../shared/constants/urls";
import getCategoryDetails from "../../../shared/utils/getCategoryDetails";
import { BrandsModel } from "../data/models/brands_model";

interface BrandsGridViewProps {
  brands: BrandsModel;
}

const BrandsGridView: FunctionComponent<BrandsGridViewProps> = ({ brands }) => {
  return (
    <div className="custom-grid-1234">
      {brands.data.map(({ id, attributes }) => {
        const { profit, sold, revenue } = getCategoryDetails(
          attributes.products
        );

        return (
          <Link key={id} href={Routes.BRAND_DETAILS(id)}>
            <a className="custom-category-product-link">
              <div className="custom-category-product-container">
                <div className="flex justify-center">
                  <Avatar
                    alt="Product Image"
                    width="w-14"
                    url={
                      attributes.image.data
                        ? `${BASE_URL}${attributes.image.data.attributes.url}`
                        : "/images/no_image.jpg"
                    }
                  />
                </div>

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
                    <span className="text-lg font-semibold">
                      GH¢{profit} {""}
                    </span>
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

export default BrandsGridView;
