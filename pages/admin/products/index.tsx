import { observer } from "mobx-react-lite";
import type { GetServerSideProps, NextPage } from "next";
import nookies, { parseCookies } from "nookies";
import { useState } from "react";
import productsController from "../../../src/modules/admin/products/products_controller";
import { ProductsModel } from "../../../src/modules/admin/products/products_model";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import CategoriesProductsSelectView from "../../../src/shared/components/CategoriesProductsSelectView";
import ErrorContent from "../../../src/shared/components/ErrorContent";
import ProductsContainer from "../../../src/shared/components/ProductsContainer";

interface ProductsPageProps {
  products: ProductsModel | null;
}

const Products: NextPage<ProductsPageProps> = (props) => {
  const [products, setProducts] = useState(props.products);

  return (
    <AdminLayout titlePrefix="Products">
      <div>
        <div className="flex flex-col justify-between gap-2 pt-4 sm:flex-row sm:items-center">
          <p className="custom-heading1">Products</p>

          <div className="flex gap-4">
            <CategoriesProductsSelectView
              title="Table View"
              isActive={productsController.isTableView}
              setIsActive={() => productsController.setIsTableView(true)}
            />

            <CategoriesProductsSelectView
              title="Grid View"
              isActive={!productsController.isTableView}
              setIsActive={() => productsController.setIsTableView(false)}
            />
          </div>
        </div>
        <p className="custom-subtitle1">
          Manage your products to increase sales
        </p>

        <div className="custom-categories-products-container">
          {!products ? (
            <ErrorContent
              title="Products"
              setContent={() =>
                productsController.getProducts().then((res) => setProducts(res))
              }
            />
          ) : (
            <ProductsContainer
              setContent={(page) => {
                if (productsController.searchQuery === "") {
                  productsController
                    .getProducts(page)
                    .then((res) => setProducts(res));
                } else {
                  productsController
                    .changeSearchedProductsPage(page)
                    .then((res) => setProducts(res));
                }
              }}
              isTableView={productsController.isTableView}
              loading={productsController.loading}
              products={products}
              setProducts={setProducts}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = await productsController.getProducts();

  // const jwt = parseCookies(context.req).jwt;
  // const jwt = nookies.get(context.res);
  // console.log(jwt);
  // console.log(context.req.cookies.jwt);

  // if (!context.req.cookies) {
  //   return {
  //     redirect: {
  //       destination: Routes.ADMIN_LOGIN,
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      products,
    },
  };
};

export default observer(Products);
