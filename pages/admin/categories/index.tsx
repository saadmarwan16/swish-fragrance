import { observer } from "mobx-react-lite";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import categoriesController from "../../../src/modules/admin/categories/categories_controller";
import { CategoriesModel } from "../../../src/modules/admin/categories/categories_model";
import CategoriesGridView from "../../../src/modules/admin/categories/components/CategoriesGridView";
import CategoriesTableView from "../../../src/modules/admin/categories/components/CategoriesTableView";
import CategoriesTitleSearch from "../../../src/modules/admin/categories/components/CategoriesTitleSearch";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import CategoriesProductsSelectView from "../../../src/shared/components/CategoriesProductsSelectView";
import EmptyContent from "../../../src/shared/components/EmptyContent";
import ErrorContent from "../../../src/shared/components/ErrorContent";
import LoaderContent from "../../../src/shared/components/LoaderContent";
import PaginationTabs from "../../../src/shared/components/PaginationTabs";

interface CategoriesPageProps {
  categories: CategoriesModel | null;
}

const Categories: NextPage<CategoriesPageProps> = (props) => {
  const [categories, setCategories] = useState(props.categories);

  return (
    <AdminLayout titlePrefix="Categories">
      <div>
        <div className="flex flex-col justify-between gap-2 pt-4 sm:flex-row sm:items-center">
          <p className="custom-heading1">Categories</p>

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
          Manage your categories and increase sales
        </p>
        <div className="custom-categories-products-container">
          {!categories ? (
            <ErrorContent
              title="Categories"
              setContent={() =>
                categoriesController
                  .getCategories()
                  .then((res) => setCategories(res))
              }
            />
          ) : (
            <>
              <CategoriesTitleSearch
                itemsCount={categories.data.length}
                pagination={categories.meta.pagination}
                setContent={(value) => setCategories(value)}
              />

              {categoriesController.loading ? (
                <LoaderContent />
              ) : (
                <>
                  {categories.data.length === 0 ? (
                    <EmptyContent title="Categories" content="categories" />
                  ) : (
                    <>
                      {categoriesController.isTableView ? (
                        <CategoriesTableView categories={categories} />
                      ) : (
                        <CategoriesGridView categories={categories} />
                      )}

                      <PaginationTabs
                        pagination={categories.meta.pagination}
                        setContent={(page) => {
                          if (categoriesController.searchQuery === "") {
                            categoriesController
                              .getCategories(page)
                              .then((res) => setCategories(res));
                          } else {
                            categoriesController
                              .changeSearchedCategoriesPage(page)
                              .then((res) => setCategories(res));
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

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await categoriesController.getCategories();

  return {
    props: {
      categories,
    },
  };
};

export default observer(Categories);