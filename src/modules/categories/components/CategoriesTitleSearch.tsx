import debounce from "lodash.debounce";
import { FunctionComponent, useCallback } from "react";
import { ErrorModel } from "../../../shared/data/models/errror_model";
import { Pagination } from "../../products/data/models/products_model";
import categoriesController from "../controllers/categories_controller";
import { CategoriesModel } from "../data/models/categories_model";

interface CategoriesTitleSearchProps {
  itemsCount: number;
  pagination: Pagination;
  setError: (value: ErrorModel | null) => void;
  setContent: (value: CategoriesModel | null) => void;
}

const CategoriesTitleSearch: FunctionComponent<CategoriesTitleSearchProps> = ({
  itemsCount,
  pagination: { page, pageSize, total },
  setError,
  setContent,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearchQueryChanged = useCallback(
    debounce((value: string) => {
      categoriesController.getMany(value).then((res) => {
        const { error, categories } = res;
        setError(error);
        setContent(categories);
      });
    }, 500),
    []
  );

  const startingCursor = itemsCount > 0 ? 1 + (page - 1) * pageSize : 0;
  const endingCursor =
    startingCursor === 0 ? 0 : startingCursor + itemsCount - 1;

  return (
    <div className="flex flex-col gap-2 pb-4 sm:flex-row sm:justify-between sm:items-center">
      <div className="flex flex-col gap-1 sm:items-center sm:flex-row md:gap-2 lg:gap-3">
        <p className="custom-heading2 text-primary">Categories</p>
        <div className="px-2 py-1 border rounded-lg custom-flex-center border-base-300 max-w-fit sm:max-w-xs">
          <p className="text-xs sm:text-sm md:text-base">
            Showing {startingCursor} - {endingCursor} of {total}
          </p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search categories by name ..."
        className="max-w-xs custom-input"
        onChange={(e) => onSearchQueryChanged(e.target.value)}
      />
    </div>
  );
};

export default CategoriesTitleSearch;
