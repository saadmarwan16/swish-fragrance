import { FunctionComponent, useState } from "react";
import categoriesController from "../categories_controller";
import { CategoryModel } from "../category_model";

interface UpdateCategoryModalProps {
  id: number;
  name: string;
  setCategory: (category: CategoryModel | null) => void;
}

const UpdateCategoryModal: FunctionComponent<UpdateCategoryModalProps> = ({
  id,
  name,
  setCategory,
}) => {
  const [value, setValue] = useState(name);
  const [isValueError, setIsValueError] = useState(false);

  return (
    <>
      <label htmlFor="update-category" className="btn btn-sm btn-primary">
        Update Category
      </label>

      <input type="checkbox" id="update-category" className="modal-toggle" />
      <label
        className="cursor-pointer modal modal-bottom sm:modal-middle"
        htmlFor="update-category"
      >
        <label className="relative modal-box" htmlFor="">
          <label
            htmlFor="update-category"
            className="absolute btn btn-sm btn-circle right-2 top-6"
          >
            ✕
          </label>

          <h3 className="text-lg font-bold">Update Category</h3>

          <div className="w-full max-w-xs pt-3 form-control">
            <label className="label">
              <span className="font-semibold label-text">Category Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter category name here..."
              className={`custom-input ${isValueError && '!border-error'}`}
              value={value}
              onChange={(e) => {
                setIsValueError(e.target.value.length < 3);
                setValue(e.target.value);
              }}
            />

            {isValueError && (
              <label className="label">
                <span className="text-sm label-text text-error">
                  Category name must contain at least 3 characters
                </span>
              </label>
            )}
          </div>

          <div className="modal-action">
            <label
              htmlFor="update-category"
              className="btn btn-sm btn-primary"
              onClick={(e) => {
                if (value.length < 3) {
                  e.preventDefault();
                  return;
                }

                if (value.length >= 3) {
                  categoriesController.updateCategory(id, value).then((res) => {
                    setCategory(res);
                  });
                }
              }}
            >
              Update
            </label>
          </div>
        </label>
      </label>
    </>
  );
};

export default UpdateCategoryModal;
