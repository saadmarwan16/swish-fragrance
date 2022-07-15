import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import {
  CategoriesModel,
  ConvertCategories,
} from "../../src/modules/admin/categories/categories_model";
import AdminLayout from "../../src/shared/components/AdminLayout";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import CategoriesGridView from "../../src/modules/admin/categories/components/CategoriesGridView";
import CategoriesTableView from "../../src/modules/admin/categories/components/CategoriesTableView";
import PaginationTabs from "../../src/shared/components/PaginationTabs";
import CategoriesTitleSearch from "../../src/modules/admin/categories/components/CategoriesTitleSearch";

interface CategoriesPageProps {
  categoriesModel: CategoriesModel;
}

const Categories: NextPage<CategoriesPageProps> = ({ categoriesModel }) => {
  const [categories, setCategories] = useState(categoriesModel);
  const [isTableView, setIsTableView] = useState(true);

  return (
    <AdminLayout titlePrefix="Categories">
      <div>
        <div className="flex flex-col justify-between gap-2 pt-4 sm:flex-row sm:items-center">
          <p className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl">
            Categories
          </p>

          <div className="flex gap-4">
            <div
              className={`flex items-center gap-2 px-3 py-1 border rounded-lg ${
                isTableView ? "border-primary text-primary" : "border-base-300"
              } hover:cursor-pointer hover:bg-base-200`}
              onClick={() => setIsTableView(true)}
            >
              <AiOutlineUnorderedList />
              <p className="text-xs sm:text-sm md:text-base">Table View</p>
            </div>

            <div
              className={`flex items-center gap-2 px-3 py-1 border rounded-lg ${
                isTableView ? "border-base-300" : "border-primary text-primary"
              } hover:cursor-pointer hover:bg-base-200`}
              onClick={() => setIsTableView(false)}
            >
              <BsFillGrid3X3GapFill />
              <p className="text-xs sm:text-sm md:text-base">Grid View</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 lg:text-base">
          Manage your categories and increase sales
        </p>
        <div className="p-4 my-4 border rounded-lg border-base-300">
          <CategoriesTitleSearch itemCount={categories.meta.pagination.total} />

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
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(
    "http://localhost:1337/api/categories?populate=*"
  );
  const categoriesModel = ConvertCategories.toCategoriesModel(
    await response.text()
  );

  return {
    props: {
      categoriesModel,
    },
  };
};

export default Categories;
