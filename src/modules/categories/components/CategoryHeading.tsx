import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import SizedDeleteButton from "../../../shared/components/SizedDeleteButton";
import SizedSaveButton from "../../../shared/components/SizedSaveButton";
import Routes from "../../../shared/constants/routes";
import errorToast from "../../../shared/utils/errorToast";
import categoryController from "../controllers/category_controller";
import { CategoryModel } from "../data/models/category_model";

interface CategoryHeadingProps {
  category: CategoryModel;
  isDirty: boolean;
}

const CategoryHeading: FunctionComponent<CategoryHeadingProps> = ({
  category,
  isDirty,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between gap-2 pt-4 sm:flex-row sm:items-center">
      <div>
        <p className="custom-heading1">
          {category.data.attributes.entity.name}
        </p>

        <p className="custom-subtitle1">
          {category.data.attributes.entity.products.length} product(s) found
        </p>
      </div>

      <div className="flex gap-3">
        <SizedDeleteButton
          loading={categoryController.deleting}
          onClick={() => {
            categoryController
              .delete(category.data.attributes.entity.id.toString())
              .then((res) => {
                const { error } = res;
                if (error) {
                  errorToast(error.name, error.message);

                  return;
                }

                router.push(Routes.CATEGORIES);
              });
          }}
        />

        <SizedSaveButton
          isLoading={categoryController.saving}
          title="Save"
          isDisabled={!isDirty}
        />
      </div>
    </div>
  );
};

export default observer(CategoryHeading);
