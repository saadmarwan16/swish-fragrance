import debounce from "lodash.debounce";
import { FunctionComponent, useCallback } from "react";
import errorToast from "../../../shared/utils/errorToast";
import { Pagination } from "../../products/data/models/products_model";
import brandsController from "../controllers/brands_controller";
import { BrandsModel } from "../data/models/brands_model";

interface BrandsTitleSearchProps {
  itemsCount: number;
  pagination: Pagination;
  setContent: (value: BrandsModel | null) => void;
}

const BrandsTitleSearch: FunctionComponent<BrandsTitleSearchProps> = ({
  itemsCount,
  pagination: { page, pageSize, total },
  setContent,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearchQueryChanged = useCallback(
    debounce((value: string) => {
      brandsController.getMany(value).then((res) => {
        const { error, brands } = res;
        if (error) {
          errorToast(error.name, error.message);
        }

        setContent(brands);
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
        <p className="custom-heading2 text-primary">Brands</p>
        <div className="px-2 py-1 border rounded-lg custom-flex-center border-base-300 max-w-fit sm:max-w-xs">
          <p className="text-xs sm:text-sm md:text-base">
            Showing {startingCursor} - {endingCursor} of {total}
          </p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search brands by name ..."
        className="max-w-xs custom-input"
        onChange={(e) => onSearchQueryChanged(e.target.value)}
      />
    </div>
  );
};

export default BrandsTitleSearch;
