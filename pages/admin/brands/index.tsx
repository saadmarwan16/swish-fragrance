import { observer } from "mobx-react-lite";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import brandsController from "../../../src/modules/brands/controllers/brands_controller";
import { BrandsModel } from "../../../src/modules/brands/data/models/brands_model";
import BrandsGridView from "../../../src/modules/brands/components/BrandsGridView";
import BrandsTableView from "../../../src/modules/brands/components/BrandsTableView";
import BrandsTitleSearch from "../../../src/modules/brands/components/BrandsTitleSearch";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import CategoriesProductsSelectView from "../../../src/shared/components/CategoriesProductsSelectView";
import PaginationTabs from "../../../src/shared/components/PaginationTabs";
import ErrorContent from "../../../src/shared/components/ErrorContent";
import EmptyContent from "../../../src/shared/components/EmptyContent";
import LoaderContent from "../../../src/shared/components/LoaderContent";
import { ErrorModel } from "../../../src/shared/data/models/errror_model";
import errorToast from "../../../src/shared/utils/errorToast";

interface CategoriesPageProps {
  brands: BrandsModel | null;
  error: ErrorModel | null;
}

const Categories: NextPage<CategoriesPageProps> = (props) => {
  const [brands, setBrands] = useState(props.brands);
  const [error, setError] = useState(props.error);

  return (
    <AdminLayout titlePrefix="Brands">
      <div>
        <div className="flex flex-col justify-between gap-2 pt-4 sm:flex-row sm:items-center">
          <p className="custom-heading1">Brands</p>

          <div className="flex gap-4">
            <CategoriesProductsSelectView
              title="Table View"
              isActive={brandsController.isTableView}
              setIsActive={() => brandsController.setIsTableView(true)}
            />

            <CategoriesProductsSelectView
              title="Grid View"
              isActive={!brandsController.isTableView}
              setIsActive={() => brandsController.setIsTableView(false)}
            />
          </div>
        </div>
        <p className="custom-subtitle1">Manage your brands to increase sales</p>
        <div className="custom-categories-products-container">
          {!brands ? (
            <ErrorContent
              title="brands"
              errorMessage={error?.message}
              errorName={error?.name}
              setContent={() => {
                brandsController.getAll().then((res) => {
                  const { error, brands } = res;
                  if (error) {
                    setError(error);
                    errorToast(error.name, error.message);
                    return;
                  }

                  setBrands(brands);
                });
              }}
            />
          ) : (
            <>
              <BrandsTitleSearch
                itemsCount={brands.data.length}
                pagination={brands.meta.pagination}
                setContent={(value) => setBrands(value)}
              />

              {brandsController.loading ? (
                <LoaderContent />
              ) : (
                <>
                  {brands.data.length === 0 ? (
                    <EmptyContent title="Brands" content="brands" />
                  ) : (
                    <>
                      {brandsController.isTableView ? (
                        <BrandsTableView brands={brands} />
                      ) : (
                        <BrandsGridView brands={brands} />
                      )}

                      <PaginationTabs
                        pagination={brands.meta.pagination}
                        setContent={(page) => {
                          if (brandsController.queryString === "") {
                            brandsController.getAll(page).then((res) => {
                              const { error, brands } = res;
                              if (error) {
                                errorToast(error.name, error.message);
                              }

                              setBrands(brands);
                            });
                          } else {
                            brandsController
                              .changeSearchedBrandsPage(page)
                              .then((res) => {
                                const { error, brands } = res;
                                if (error) {
                                  errorToast(error.name, error.message);
                                }

                                setBrands(brands);
                              });
                          }
                        }}
                      />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: await brandsController.getAll(),
  };
};

export default observer(Categories);
