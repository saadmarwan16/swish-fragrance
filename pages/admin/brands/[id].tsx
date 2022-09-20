import { observer } from "mobx-react-lite";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { GrView } from "react-icons/gr";
import brandController from "../../../src/modules/brands/controllers/brand_controller";
import {
  BrandModel,
  Product,
} from "../../../src/modules/brands/data/models/brand_model";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import ErrorContent from "../../../src/shared/components/ErrorContent";
import Routes from "../../../src/shared/constants/routes";
import { BASE_URL } from "../../../src/shared/constants/urls";
import { ErrorModel } from "../../../src/shared/data/models/errror_model";
import {
  IBrandInputs,
  IProductSizeOption,
} from "../../../src/shared/types/interfaces";
import adminServerProps from "../../../src/shared/utils/adminServerProps";
import errorToast from "../../../src/shared/utils/errorToast";
import sortProducts from "../../../src/shared/utils/sortProducts";
import BrandHeading from "../../../src/modules/brands/components/BrandHeading";
import EntryImage from "../../../src/shared/components/EntryImage";
import EntryProductSelect from "../../../src/shared/components/EntryProductSelect";
import EntryProduct from "../../../src/shared/components/EntryProduct";
import convert2base64 from "../../../src/shared/utils/convert2Base64";

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
    const products: number[] = [];
    data.products.forEach((product) => {
      products.push(product.value);
    });
    const transformedData = {
      ...data,
      products,
    };
    brandController
      .update(props.id, isImageUpdatd, transformedData)
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
    convert2base64(file, setImage);
    setIsImageUpdatd(true);
    setValue("image", file, { shouldDirty: true });
  };

  return (
    <AdminLayout
      titlePrefix={brand?.data.attributes.entity.name ?? "Brand Details"}
    >
      {brand && allProducts ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <BrandHeading brand={brand} isDirty={isDirty} />

          <div className="flex flex-col gap-4 mt-10 md:flex-row sm:gap-8 md:gap-12 lg:gap-16">
            <EntryImage
              nameError={errors.name}
              image={image}
              registerName={register("name")}
              registerUpdateImage={register("image", {
                onChange: (e) => {
                  const files = e.target.files;
                  if (files !== null && files.length > 0) {
                    updateImage(files[0]);
                  }
                },
              })}
              registerUploadImage={register("image", {
                onChange: (e) => {
                  const files = e.target.files;
                  if (files !== null && files.length > 0) {
                    updateImage(files[0]);
                  }
                },
              })}
              removeImage={() => {
                setImage(null);
                setIsImageUpdatd(true);
                setValue("image", undefined, {
                  shouldDirty: true,
                });
              }}
            />

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
