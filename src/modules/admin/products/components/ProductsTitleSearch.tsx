import { FunctionComponent } from "react";

interface ProductsTitleSearchProps {
  itemCount: number;
}

const ProductsTitleSearch: FunctionComponent<ProductsTitleSearchProps> = ({
  itemCount,
}) => {
  return (
    <div className="flex flex-col gap-2 pb-4 sm:flex-row sm:justify-between sm:items-center">
      <p className="custom-heading2 text-primary">Products ({itemCount})</p>

      <input
        type="text"
        placeholder="Search products by name ..."
        className="max-w-xs custom-input"
      />
    </div>
  );
};

export default ProductsTitleSearch;
