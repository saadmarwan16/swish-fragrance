import { observer } from "mobx-react-lite";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import UpdateCategoryModal from "../../../src/modules/categories/components/UpdateCategoryModal";
import categoriesController from "../../../src/modules/categories/controllers/categories_controller";
import categoryController from "../../../src/modules/categories/controllers/category_controller";
import { CategoryModel } from "../../../src/modules/categories/data/models/category_model";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import CategoriesProductsSelectView from "../../../src/shared/components/CategoriesProductsSelectView";
import { ErrorModel } from "../../../src/shared/data/models/errror_model";
import adminServerProps from "../../../src/shared/utils/adminServerProps";

interface CategoryDetailsPageProps {
  id: string;
  category: CategoryModel | null;
  error: ErrorModel | null;
}

const CategoryDetails: NextPage<CategoryDetailsPageProps> = (props) => {
  const [category, setCategory] = useState(props.category);
  const [error, setError] = useState(props.error);

  return (
    <AdminLayout
      titlePrefix={category?.data.attributes.name ?? "Category Details"}
    >
      <div className="flex flex-col justify-between gap-2 pt-4 sm:flex-row sm:items-center">
        <div>
          <p className="custom-heading1">{category?.data.attributes.name}</p>

          <p className="custom-subtitle1">
            {category?.data.attributes.products.data.length} product(s) found
          </p>
        </div>

        <UpdateCategoryModal
          setCategory={(category) => setCategory(category)}
          id={category!.data.id}
          name={category!.data.attributes.name}
        />
      </div>

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
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return adminServerProps(ctx, async () => {
    const id = ctx.query.id as string;
    const results = await categoryController.getOne(id);

    return {
      props: {
        id,
        ...results,
      },
    };
  });
};

export default observer(CategoryDetails);
