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
import EmptyContent from "../../../src/shared/components/EmptyContent";
import ErrorContent from "../../../src/shared/components/ErrorContent";
import LoaderContent from "../../../src/shared/components/LoaderContent";
import PaginationTabs from "../../../src/shared/components/PaginationTabs";

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
            <>
              <ProductsTitleSearch
                itemsCount={products.data.length}
                pagination={products.meta.pagination}
                setProducts={setProducts}
              />

              {productsController.loading ? (
                <LoaderContent />
              ) : (
                <>
                  {products.data.length === 0 ? (
                    <EmptyContent title="Products" content="products" />
                  ) : (
                    <>
                      {productsController.isTableView ? (
                        <ProductsTableView products={products} />
                      ) : (
                        <ProductsGridView products={products} />
                      )}

                      <PaginationTabs
                        pagination={products.meta.pagination}
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
                      />
                    </>
                  )}
                </>
              )}
            </>
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
