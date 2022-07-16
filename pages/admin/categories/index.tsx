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
import PaginationTabs from "../../../src/shared/components/PaginationTabs";

interface CategoriesPageProps {
  categories?: CategoriesModel;
}

const Categories: NextPage<CategoriesPageProps> = (props) => {
  const [isTableView, setIsTableView] = useState(true);
  const categories = props.categories;

  return (
    <AdminLayout titlePrefix="Categories">
      {!categories ? (
        <div>Cannot find categories</div>
      ) : (
        <div>
          <div className="flex flex-col justify-between gap-2 pt-4 sm:flex-row sm:items-center">
            <p className="custom-heading1">Categories</p>

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
            Manage your categories and increase sales
          </p>
          <div className="custom-categories-products-container">
            <CategoriesTitleSearch
              itemCount={categories.meta.pagination.total}
            />

            {isTableView ? (
              <CategoriesTableView categories={categories} />
            ) : (
              <CategoriesGridView categories={categories} />
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

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await categoriesController.getCategories();

  return {
    props: {
      categories,
    },
  };
};

export default observer(Categories);
