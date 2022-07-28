import { FunctionComponent, useState } from "react";
import categoriesController from "../controllers/categories_controller";
import { CategoriesModel } from "../data/models/categories_model";

interface NewCategoryModalProps {
  setCategories: (categories: CategoriesModel | null) => void;
}

const NewCategoryModal: FunctionComponent<NewCategoryModalProps> = ({
  setCategories,
}) => {
  const [value, setValue] = useState("");
  const [isValueError, setIsValueError] = useState(false);
  const [shouldShowError, setShouldShowError] = useState(false);

  return (
    <>
      <label htmlFor="new-category" className="btn btn-sm btn-primary">
        New Category
      </label>

      <input type="checkbox" id="new-category" className="modal-toggle" />
      <label
        className="cursor-pointer modal modal-bottom sm:modal-middle"
        htmlFor="new-category"
      >
        <label className="relative modal-box" htmlFor="">
          <label
            htmlFor="new-category"
            className="absolute btn btn-sm btn-circle right-2 top-6"
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
              className={`custom-input ${
                isValueError && shouldShowError && "!border-error"
              }`}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setIsValueError(e.target.value.length < 3);
              }}
            />

            {isValueError && shouldShowError && (
              <label className="label">
                <span className="text-sm label-text text-error">
                  Category name must contain at least 3 characters
                </span>
              </label>
            )}
          </div>

          <div className="modal-action">
            <label
              htmlFor="new-category"
              className="btn btn-sm btn-primary"
              onClick={(e) => {
                if (value.length < 3) {
                  e.preventDefault();
                  setShouldShowError(true);
                  return;
                }

                setShouldShowError(false);
                categoriesController.newCategory(value).then((res) => {
                  setValue("");
                  setCategories(res);
                });
              }}
            >
              Create
            </label>
          </div>
        </label>
      </label>
    </>
  );
};

export default NewCategoryModal;
