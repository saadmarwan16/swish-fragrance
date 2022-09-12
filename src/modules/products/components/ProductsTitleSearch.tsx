import { observer } from "mobx-react-lite";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useCallback,
} from "react";
import productsController from "../controllers/products_controller";
import { Pagination, ProductsModel } from "../data/models/products_model";
import debounce from "lodash.debounce";

interface ProductsTitleSearchProps {
  itemsCount: number;
  pagination: Pagination;
  setProducts: Dispatch<SetStateAction<ProductsModel | null>>;
}

const ProductsTitleSearch: FunctionComponent<ProductsTitleSearchProps> = ({
  itemsCount,
  pagination: { page, pageSize, total },
  setProducts,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearchQueryChanged = useCallback(
    debounce((value: string) => {
      productsController
        .getProductsBySearch(value)
        .then((res) => setProducts(res));
    }, 500),
    []
  );

  const startingCursor = itemsCount > 0 ? 1 + (page - 1) * pageSize : 0;
  const endingCursor =
    startingCursor === 0 ? 0 : startingCursor + itemsCount - 1;

  return (
    <div className="flex flex-col gap-2 pb-4 sm:flex-row sm:justify-between sm:items-center">
      <div className="flex flex-col gap-1 sm:items-center sm:flex-row md:gap-2 lg:gap-3">
        <p className="custom-heading2 text-primary">Products</p>
        <div className="px-2 py-1 border rounded-lg custom-flex-center border-base-300 max-w-fit sm:max-w-xs">
          <p className="text-xs sm:text-sm md:text-base">
            Showing {startingCursor} - {endingCursor} of {total}
          </p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search products by name ..."
        className="max-w-xs custom-input"
        onChange={(e) => onSearchQueryChanged(e.target.value)}
      />
    </div>
  );
};

export default observer(ProductsTitleSearch);
