import { observer } from "mobx-react-lite";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useCallback,
} from "react";
import productsController from "../products_controller";
import { Pagination, ProductsModel } from "../products_model";
import { IoFilter } from "react-icons/io5";
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
    // <div className="flex flex-col gap-2 pb-4 sm:flex-row sm:justify-between sm:items-center">
    //   <p className="custom-heading2 text-primary">Products ({itemCount})</p>

    //   <div className="flex flex-1 sm:justify-end">
    //     <div className="dropdown">
    //       <div className="custom-input-group">
    //         <input
    //           type="text"
    //           placeholder="Search products by name ..."
    //           className="max-w-xs custom-input"
    //           onChange={(e) => onSearchQueryChanged(e.target.value)}
    //         />

    //         <label
    //           tabIndex={0}
    //           className="px-2 cursor-pointer sm:px-4 bg-base-300 custom-flex-center"
    //         >
    //           <IoFilter className="text-xl sm:text-2xl" />
    //         </label>
    //         <div
    //           tabIndex={0}
    //           className="relative w-48 p-2 shadow sm:w-64 dropdown-content card card-compact bg-base-200 text-primary-content top-10 sm:top-14"
    //         >
    //           <div className="form-control">
    //             <label className="justify-start cursor-pointer label">
    //               <input
    //                 type="checkbox"
    //                 // checked={true}
    //                 className="checkbox"
    //               />
    //               <span className="pl-4 !bg-transparent">Male</span>
    //             </label>
    //           </div>
    //           <div className="form-control">
    //             <label className="justify-start cursor-pointer label">
    //               <input
    //                 type="checkbox"
    //                 // checked={true}
    //                 className="checkbox"
    //               />
    //               <span className="pl-4 !bg-transparent">Female</span>
    //             </label>
    //           </div>
    //           <div className="form-control">
    //             <label className="justify-start cursor-pointer label">
    //               <input
    //                 type="checkbox"
    //                 // checked={true}
    //                 className="checkbox"
    //               />
    //               <span className="pl-4 !bg-transparent">Unisex</span>
    //             </label>
    //           </div>
    //           <div className="form-control">
    //             <label className="justify-start cursor-pointer label">
    //               <input
    //                 type="checkbox"
    //                 // checked={true}
    //                 className="checkbox"
    //               />
    //               <span className="pl-4 !bg-transparent">Private Blend</span>
    //             </label>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default observer(ProductsTitleSearch);
