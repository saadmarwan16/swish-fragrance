import { observer } from "mobx-react-lite";
import { FunctionComponent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICategoryInputs } from "../../../shared/types/interfaces";
import errorToast from "../../../shared/utils/errorToast";
import categoriesController from "../controllers/categories_controller";
import { CategoriesModel } from "../data/models/categories_model";

interface NewCategoryModalProps {
  setCategories: (categories: CategoriesModel | null) => void;
}

const NewCategoryModal: FunctionComponent<NewCategoryModalProps> = ({
  setCategories,
}) => {
  const [shouldShowModal, setShouldShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategoryInputs>();

  const onSubmit: SubmitHandler<ICategoryInputs> = (data) => {
    categoriesController.create(data).then((res) => {
      const { error, categories } = res;
      if (error) {
        errorToast(error.name, error.message);

        return;
      }

      setCategories(categories);
      reset();
      setShouldShowModal(false);
    });
  };

  return (
    <>
      <label
        htmlFor="new-category"
        className="btn btn-sm btn-primary"
        onClick={() => setShouldShowModal(true)}
      >
        New Category
      </label>

      <input
        type="checkbox"
        id="new-category"
        className="modal-toggle"
        checked={shouldShowModal}
        onChange={() => {}}
      />
      <label
        className="cursor-pointer modal modal-bottom sm:modal-middle"
        htmlFor="new-category"
      >
        <form className="relative modal-box" onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="new-category"
            className="absolute btn btn-sm btn-circle right-2 top-6"
            onClick={() => {
              reset();
              setShouldShowModal(false);
            }}
          >
            ✕
          </label>

          <h3 className="text-lg font-bold">Create New Category</h3>

          <div className="w-full max-w-xs pt-3 form-control">
            <label className="label">
              <span className="font-semibold label-text">Category Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter category name here..."
              className={`custom-input ${errors.name && "!border-error"}`}
              {...register("name", {
                required: "Category name is required",
                minLength: {
                  value: 3,
                  message: "Category name must contain at least 3 characters",
                },
              })}
            />

            {errors.name && (
              <label className="label">
                <span className="text-error label-text-alt ">
                  {errors.name.message}
                </span>
              </label>
            )}
          </div>

          <div className="modal-action">
            <label htmlFor="new-category">
              <button
                className={`btn btn-sm btn-primary ${
                  categoriesController.loading && "loading"
                }`}
                type="submit"
              >
                Create
              </button>
            </label>
          </div>
        </form>
      </label>
    </>
  );
};

export default observer(NewCategoryModal);
