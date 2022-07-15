import type { GetServerSideProps, NextPage } from "next";
import productsController from "../../../src/modules/admin/products/products_controller";
import { ProductsModel } from "../../../src/modules/admin/products/products_model";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import LogoAvatar from "../../../src/shared/components/LogoAvatar";

interface ProductsPageProps {
  products?: ProductsModel;
}

const Products: NextPage<ProductsPageProps> = (props) => {
  const products = props.products;

  return (
    <AdminLayout titlePrefix="Products">
      {!products ? (
        <div>Cannot find products</div>
      ) : (
        <div>
          <div className="pt-4">
            <p className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl">
              Products
            </p>
          </div>
          <p className="text-sm text-gray-500 lg:text-base">
            Manage your products and increase sales
          </p>
          <div className="py-4">
            <p className="font-semibold md:text-lg lg:text-xl text-primary">
              Products ({products.meta.pagination.total})
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.data.map(
              ({
                id,
                attributes: {
                  name,
                  in_stock,
                  revenue_generated,
                  starting_price,
                  number_sold,
                },
              }) => (
                <div
                  className="flex flex-col gap-4 p-4 border rounded-lg border-secondary"
                  key={id}
                >
                  <div className="flex justify-center">
                    <LogoAvatar />
                  </div>
                  <div className="flex justify-center">
                    <p className="text-lg font-semibold">{name}</p>
                  </div>
                  <div>
                    <div>
                      <span className="text-primary">Starting Price: </span>
                      <span className="font-semibold">${starting_price}</span>
                    </div>
                    <div>
                      <span className="text-primary">Number Sold: </span>
                      <span className="font-semibold">{number_sold}</span>
                    </div>
                    <div>
                      <span className="text-primary">Revenue Generated: </span>
                      <span className="font-semibold">
                        ${revenue_generated}
                      </span>
                    </div>
                    <div>
                      <span className="text-primary">Number In Stock: </span>
                      <span className="font-semibold">{in_stock}</span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await productsController.getProducts();

  return {
    props: {
      products,
    },
  };
};

export default Products;
