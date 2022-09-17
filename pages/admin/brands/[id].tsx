import { observer } from "mobx-react-lite";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { GrView } from "react-icons/gr";
import brandsController from "../../../src/modules/brands/controllers/brands_controller";
import brandController from "../../../src/modules/brands/controllers/brand_controller";
import {
  BrandModel,
  Product,
} from "../../../src/modules/brands/data/models/brand_model";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import ErrorContent from "../../../src/shared/components/ErrorContent";
import InputField from "../../../src/shared/components/InputField";
import SizedDeleteButton from "../../../src/shared/components/SizedDeleteButton";
import SizedSaveButton from "../../../src/shared/components/SizedSaveButton";
import UpdateImageButton from "../../../src/shared/components/UpdateImageButton";
import UploadImageButton from "../../../src/shared/components/UploadImageButton";
import Routes from "../../../src/shared/constants/routes";
import { BASE_URL } from "../../../src/shared/constants/urls";
import { ErrorModel } from "../../../src/shared/data/models/errror_model";
import {
  IBrandInputs,
  IProductSizeOption,
} from "../../../src/shared/types/interfaces";
import adminServerProps from "../../../src/shared/utils/adminServerProps";
import errorToast from "../../../src/shared/utils/errorToast";
import { MdDelete } from "react-icons/md";
import sortProducts from "../../../src/shared/utils/sortProducts";

interface BrandDetailsPageProps {
  id: string;
  error: ErrorModel | null;
  brand: BrandModel | null;
}

const BrandDetails: NextPage<BrandDetailsPageProps> = (props) => {
  const [brand, setBrand] = useState(props.brand);
  const [error, setError] = useState(props.error);
  const [isImageUpdatd, setIsImageUpdatd] = useState(false);
  const [image, setImage] = useState<string | null>(() => {
    if (!props.brand?.data.attributes.entity.image?.url) return null;

    return `${BASE_URL}${props.brand?.data.attributes.entity.image.url}`;
  });

  const [allProducts, setAllProducts] = useState(() => {
    const tempAllProducts = brand?.data.attributes.all_products;
    const tempBrandProducts = brand?.data.attributes.entity.products;
    if (!tempAllProducts || !tempBrandProducts) return null;

    let allProducts: IProductSizeOption[] = [];
    tempAllProducts.data.forEach((product) => {
      allProducts.push({
        text: product.attributes.name,
        value: product.id,
      });
    });
    const brandProducts: number[] = [];
    tempBrandProducts.forEach((product) => {
      brandProducts.push(product.id);
    });

    allProducts = allProducts.filter(
      (product) => !brandProducts.includes(product.value)
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
    setValue,
    control,
    formState: { errors, isDirty },
  } = useForm<IBrandInputs>({
    defaultValues: {
      name: brand?.data.attributes.entity.name,
      image: null,
      products: brand?.data.attributes.entity.products
        ? getProducts(brand?.data.attributes.entity.products)
        : [],
    },
  });

  const { fields, append, remove } = useFieldArray<IBrandInputs>({
    name: "products",
    control,
  });

  const onSubmit: SubmitHandler<IBrandInputs> = async (data) => {
    const imageId = brand?.data.attributes.entity.image?.id;
    const products: number[] = [];
    data.products.forEach((product) => {
      products.push(product.value);
    });
    const transformedData = {
      ...data,
      products,
    };
    brandController
      .update(
        brand?.data.attributes.entity.id.toString()!,
        isImageUpdatd,
        transformedData
      )
      .then((res) => {
        const { error, brand } = res;
        if (error) {
          errorToast(error.name, error.message);

          return;
        }

        if (brand) {
          router.push(Routes.BRANDS);
        }
      });
  };

  const updateImage = (file: File) => {
    convert2base64(file);
    setIsImageUpdatd(true);
    setValue("image", file, { shouldDirty: true });
  };

  const convert2base64 = (file: File) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result?.toString() ?? null);
    };

    reader.readAsDataURL(file);
  };

  return (
    <AdminLayout
      titlePrefix={brand?.data.attributes.entity.name ?? "Brand Details"}
    >
      {brand && allProducts ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-between gap-2 pt-4 sm:flex-row sm:items-center">
            <div>
              <p className="custom-heading1">
                {brand.data.attributes.entity.name}
              </p>

              <p className="custom-subtitle1">
                {brand.data.attributes.entity.products.length} product(s) found
              </p>
            </div>

            <div className="flex gap-3">
              <SizedDeleteButton
                onClick={() => {
                  brandController
                    .delete(brand.data.attributes.entity.id.toString())
                    .then((res) => {
                      const { error, results } = res;
                      if (error) {
                        errorToast(error.name, error.message);
                      }

                      router.push(Routes.BRANDS);
                    });
                }}
              />

              <SizedSaveButton
                isLoading={brandsController.loading}
                title="Save"
                isDisabled={!isDirty}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-10 md:flex-row sm:gap-8 md:gap-12 lg:gap-16">
            <div className="flex flex-col flex-1 gap-8">
              {image ? (
                <UpdateImageButton
                  register={register("image", {
                    onChange: (e) => {
                      const files = e.target.files;
                      if (files !== null && files.length > 0) {
                        updateImage(files[0]);
                      }
                    },
                  })}
                  image={image}
                  removeImage={() => {
                    console.log('remove image');
                    setImage(null);
                    setIsImageUpdatd(true);
                    setValue("image", undefined, {
                      shouldDirty: true,
                    });
                  }}
                />
              ) : (
                <UploadImageButton
                  register={register("image", {
                    onChange: (e) => {
                      const files = e.target.files;
                      if (files !== null && files.length > 0) {
                        updateImage(files[0]);
                      }
                    },
                  })}
                />
              )}

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="w-full">
                  <InputField
                    type="text"
                    error={errors.name}
                    label="Brand name"
                    placeholder="Enter brand name here"
                    register={register("name")}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-1 gap-6">
              <div className="w-full form-control">
                <label className="label">
                  <span className="font-semibold label-text">
                    Add product to brand
                  </span>
                </label>

                <select
                  className="custom-select"
                  value="disabled"
                  onChange={(e) => {
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
                >
                  <option value="disabled" disabled>
                    Choose a product
                  </option>
                  {allProducts.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>

                {error && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {error.message}
                    </span>
                  </label>
                )}
              </div>

              <div>
                <span className="font-semibold">
                  This brand&apos;s product(s)
                </span>
                <div className="flex flex-col gap-2 mt-2">
                  {fields?.map((product, index) => (
                    <div
                      key={product.value}
                      className="flex items-center gap-4"
                    >
                      <div className="w-full form-control">
                        <input
                          type={"text"}
                          className="!w-full custom-input"
                          disabled
                          {...register(`products.${index}.text`)}
                        />
                      </div>

                      <button
                        className="custom-primary-button !px-2 sm:px-3 sm:h-12 !w-fit"
                        type={"button"}
                        onClick={() => {
                          const productToDelete = fields.find(
                            (field) => field.value === product.value
                          );
                          if (productToDelete) {
                            remove(index);
                            setAllProducts(() => {
                              const products = [
                                ...allProducts,
                                productToDelete,
                              ];

                              products.sort(sortProducts);

                              return products;
                            });
                          }
                        }}
                      >
                        <MdDelete className="text-xl md:text-3xl sm:text-2xl" />
                      </button>
                    </div>
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
              brandController.getOne(props.id).then((res) => {
                const { error, brand } = res;
                if (error) {
                  errorToast(error.name, error.message);
                  setError(error);
                }

                if (brand) {
                  setBrand(brand);
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
    const results = await brandController.getOne(id);

    return {
      props: {
        id,
        ...results,
      },
    };
  });
};

export default observer(BrandDetails);
