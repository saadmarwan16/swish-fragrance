import { Dispatch, FunctionComponent, SetStateAction } from "react";
import ProductsGridView from "../../modules/products/components/ProductsGridView";
import ProductsTableView from "../../modules/products/components/ProductsTableView";
import ProductsTitleSearch from "../../modules/products/components/ProductsTitleSearch";
import { ProductsModel } from "../../modules/products/data/models/products_model";
import { ErrorModel } from "../data/models/errror_model";
import EmptyContent from "./EmptyContent";
import LoaderContent from "./LoaderContent";
import PaginationTabs from "./PaginationTabs";

interface ProductsContainerProps {
  loading: boolean;
  isTableView: boolean;
  setContent: (page: number) => void;
  products: ProductsModel;
  setProducts: Dispatch<SetStateAction<ProductsModel | null>>;
  setError: Dispatch<SetStateAction<ErrorModel | null>>;
}

const ProductsContainer: FunctionComponent<ProductsContainerProps> = ({
  loading,
  isTableView,
  setContent,
  products,
  setProducts,
  setError
}) => {
  return (
    <>
      <ProductsTitleSearch
        itemsCount={products.data.length}
        pagination={products.meta.pagination}
        setProducts={setProducts}
        setError={setError}
      />

      {loading ? (
        <LoaderContent />
      ) : (
        <>
          {products.data.length === 0 ? (
            <EmptyContent title="Products" content="products" />
          ) : (
            <>
              {isTableView ? (
                <ProductsTableView products={products} />
              ) : (
                <ProductsGridView products={products} />
              )}

              <PaginationTabs
                pagination={products.meta.pagination}
                setContent={setContent}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductsContainer;
