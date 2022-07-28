import { Dispatch, FunctionComponent, SetStateAction } from "react";
import ProductsGridView from "../../modules/admin/products/components/ProductsGridView";
import ProductsTableView from "../../modules/admin/products/components/ProductsTableView";
import ProductsTitleSearch from "../../modules/admin/products/components/ProductsTitleSearch";
import { ProductsModel } from "../../modules/admin/products/products_model";
import EmptyContent from "./EmptyContent";
import LoaderContent from "./LoaderContent";
import PaginationTabs from "./PaginationTabs";

interface ProductsContainerProps {
  loading: boolean;
  isTableView: boolean;
  setContent: (page: number) => void;
  products: ProductsModel;
  setProducts: Dispatch<SetStateAction<ProductsModel | null>>;
}

const ProductsContainer: FunctionComponent<ProductsContainerProps> = ({
  loading,
  isTableView,
  setContent,
  products,
  setProducts
}) => {
  return (
    <>
      <ProductsTitleSearch
        itemsCount={products.data.length}
        pagination={products.meta.pagination}
        setProducts={setProducts}
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
