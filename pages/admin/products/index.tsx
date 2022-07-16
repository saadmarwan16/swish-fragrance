import { observer } from "mobx-react-lite";
import type { GetServerSideProps, NextPage } from "next";
import nookies, { parseCookies } from "nookies";
import { useState } from "react";
import ProductsGridView from "../../../src/modules/admin/products/components/ProductsGridView";
import ProductsTableView from "../../../src/modules/admin/products/components/ProductsTableView";
import ProductsTitleSearch from "../../../src/modules/admin/products/components/ProductsTitleSearch";
import productsController from "../../../src/modules/admin/products/products_controller";
import { ProductsModel } from "../../../src/modules/admin/products/products_model";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import CategoriesProductsSelectView from "../../../src/shared/components/CategoriesProductsSelectView";
import PaginationTabs from "../../../src/shared/components/PaginationTabs";
import Routes from "../../../src/shared/constants/routes";

interface ProductsPageProps {
  products?: ProductsModel;
}

const Products: NextPage<ProductsPageProps> = (props) => {
  const [isTableView, setIsTableView] = useState(true);
  const products = props.products ?? productsController.products;

  return (
    <AdminLayout titlePrefix="Products">
      {!products ? (
        <div>Cannot find products</div>
      ) : (
        <div>
          <div className="flex flex-col justify-between gap-2 pt-4 sm:flex-row sm:items-center">
            <p className="custom-heading1">Products</p>

            <div className="flex gap-4">
              <CategoriesProductsSelectView
                title="Table View"
                isActive={isTableView}
                setIsActive={() => setIsTableView(true)}
              />

              <CategoriesProductsSelectView
                title="Grid View"
                isActive={!isTableView}
                setIsActive={() => setIsTableView(false)}
              />
            </div>
          </div>
          <p className="custom-subtitle1">
            Manage your products and increase sales
          </p>

          <div className="custom-categories-products-container">
            <ProductsTitleSearch itemCount={products.meta.pagination.total} />

            {isTableView ? (
              <ProductsTableView products={products} />
            ) : (
              <ProductsGridView products={products} />
            )}

            <div className="flex justify-end pt-6">
              <PaginationTabs />
            </div>
          </div>
        </div>
      )}
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
