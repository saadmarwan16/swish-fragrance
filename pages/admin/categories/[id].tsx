import { observer } from "mobx-react-lite";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import CategoryHeading from "../../../src/modules/categories/components/CategoryHeading";
import categoryController from "../../../src/modules/categories/controllers/category_controller";
import {
  CategoryModel,
  Product,
} from "../../../src/modules/categories/data/models/category_model";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import EntryProduct from "../../../src/shared/components/EntryProduct";
import EntryProductSelect from "../../../src/shared/components/EntryProductSelect";
import ErrorContent from "../../../src/shared/components/ErrorContent";
import InputField from "../../../src/shared/components/InputField";
import Routes from "../../../src/shared/constants/routes";
import { ErrorModel } from "../../../src/shared/data/models/errror_model";
import {
  ICategoryInputs,
  IProductSizeOption,
} from "../../../src/shared/types/interfaces";
import adminServerProps from "../../../src/shared/utils/adminServerProps";
import errorToast from "../../../src/shared/utils/errorToast";
import sortProducts from "../../../src/shared/utils/sortProducts";

interface CategoryDetailsPageProps {
  id: string;
  category: CategoryModel | null;
  error: ErrorModel | null;
}

const CategoryDetails: NextPage<CategoryDetailsPageProps> = (props) => {
  const [category, setCategory] = useState(props.category);
  const [error, setError] = useState(props.error);

  const [allProducts, setAllProducts] = useState(() => {
    const tempAllProducts = category?.data.attributes.all_products;
    const tempBrandProducts = category?.data.attributes.entity.products;
    if (!tempAllProducts || !tempBrandProducts) return null;

    let allProducts: IProductSizeOption[] = [];
    tempAllProducts.data.forEach((product) => {
      allProducts.push({
        text: product.attributes.name,
        value: product.id,
      });
    });
    const categoryProducts: number[] = [];
    tempBrandProducts.forEach((product) => {
      categoryProducts.push(product.id);
    });

    allProducts = allProducts.filter(
      (product) => !categoryProducts.includes(product.value)
    );

    return allProducts;
  });

  const getProducts = (products: Product[]) => {
    const transformedProducts: IProductSizeOption[] = [];
    products.forEach((product) => {
      transformedProducts.push({
        text: product.name,
        value: product.id,
      });
    });

    return transformedProducts;
  };
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<ICategoryInputs>({
    defaultValues: {
      name: category?.data.attributes.entity.name,
      products: category?.data.attributes.entity.products
        ? getProducts(category?.data.attributes.entity.products)
        : [],
    },
  });

  const { fields, append, remove } = useFieldArray<ICategoryInputs>({
    name: "products",
    control,
  });

  const onSubmit: SubmitHandler<ICategoryInputs> = async (data) => {
    const products: number[] = [];
    data.products.forEach((product) => {
      products.push(product.value);
    });
    const transformedData = {
      ...data,
      products,
    };
    categoryController
      .update(category?.data.attributes.entity.id.toString()!, transformedData)
      .then((res) => {
        const { error, category } = res;
        if (error) {
          errorToast(error.name, error.message);

          return;
        }

        if (category) {
          router.push(Routes.CATEGORIES);
        }
      });
  };

  return (
    <AdminLayout
      titlePrefix={category?.data.attributes.entity.name ?? "Category Details"}
    >
      {category && allProducts ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <CategoryHeading category={category} isDirty={isDirty} />

          <div className="flex flex-col gap-4 mt-10 md:flex-row sm:gap-8 md:gap-12 lg:gap-16">
            <div className="flex-1 w-full">
              <InputField
                type="text"
                error={errors.name}
                label="Category name"
                placeholder="Enter category name here"
                register={register("name")}
              />
            </div>

            <div className="flex flex-col flex-1 gap-6">
              <EntryProductSelect
                allProducts={allProducts}
                selectValueChanged={(e) => {
                  const value = e.target.value;

                  const product = allProducts.find(
                    (product) => product.value === parseInt(value)
                  );
                  if (product) {
                    append(product);
                    setAllProducts(() =>
                      allProducts.filter(
                        (product) => product.value !== parseInt(value)
                      )
                    );
                  }
                }}
              />

              <div>
                <span className="font-semibold">
                  This brand&apos;s product(s)
                </span>
                <div className="flex flex-col gap-2 mt-2">
                  {fields?.map((product, index) => (
                    <EntryProduct
                      key={product.id}
                      register={register(`products.${index}.text`)}
                      onDeleteClicked={() => {
                        const productToDelete = fields.find(
                          (field) => field.value === product.value
                        );
                        if (productToDelete) {
                          remove(index);
                          setAllProducts(() => {
                            const products = [...allProducts, productToDelete];

                            products.sort(sortProducts);

                            return products;
                          });
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-center h-[500px]">
          <ErrorContent
            title={`brand with id #${props.id}`}
            errorMessage={error?.message}
            errorName={error?.name}
            setContent={() => {
              categoryController.getOne(props.id).then((res) => {
                const { error, category } = res;
                if (error) {
                  errorToast(error.name, error.message);
                  setError(error);

                  return;
                }

                if (category) {
                  setCategory(category);
                }
              });
            }}
          />
        </div>
      )}
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return adminServerProps(ctx, async () => {
    const id = ctx.query.id as string;
    const results = await categoryController.getOne(id);

    return {
      props: {
        id,
        ...results,
      },
    };
  });
};

export default observer(CategoryDetails);
