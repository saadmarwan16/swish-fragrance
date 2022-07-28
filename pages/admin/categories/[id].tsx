import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import categoriesController from "../../../src/modules/admin/categories/categories_controller";
import { CategoryModel } from "../../../src/modules/admin/categories/category_model";
import UpdateCategoryModal from "../../../src/modules/admin/categories/components/UpdateCategoryModal";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import CategoriesProductsSelectView from "../../../src/shared/components/CategoriesProductsSelectView";
import ErrorContent from "../../../src/shared/components/ErrorContent";
import ProductsContainer from "../../../src/shared/components/ProductsContainer";

interface CategoryDetailsPageProps {
  category: CategoryModel | null;
}

const CategoryDetails: NextPage<CategoryDetailsPageProps> = (props) => {
  const [category, setCategory] = useState(props.category);

  return (
    <AdminLayout titlePrefix="Category Details">
      <div className="text-4xl font-semibold">
        Category Details View is working with id {category?.data.id}
      </div>
      <div className="text-4xl font-semibold">
        Category Details View is working with name{" "}
        {category?.data.attributes.name}
      </div>
      <UpdateCategoryModal
        setCategory={(category) => setCategory(category)}
        id={category!.data.id}
        name={category!.data.attributes.name}
      />

      <div>
        <div className="flex flex-col justify-between gap-2 pt-4 sm:flex-row sm:items-center">
          <p className="custom-heading1">Products</p>

          <div className="flex gap-4">
            <CategoriesProductsSelectView
              title="Table View"
              isActive={categoriesController.isTableView}
              setIsActive={() => categoriesController.setIsTableView(true)}
            />

            <CategoriesProductsSelectView
              title="Grid View"
              isActive={!categoriesController.isTableView}
              setIsActive={() => categoriesController.setIsTableView(false)}
            />
          </div>
        </div>
        <p className="custom-subtitle1">
          Manage your products to increase sales
        </p>

        {/* <div className="custom-categories-products-container">
          {!category?.data.attributes.products ? (
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
              isTableView={categoriesController.isTableView}
              loading={categoriesController.loading}
              products={category.data.attributes.products}
              setProducts={setProducts}
            />
          )}
        </div> */}
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const category = await categoriesController.getCategory(query.id as string);

  return {
    props: {
      category,
    },
  };
};

export default CategoryDetails;
