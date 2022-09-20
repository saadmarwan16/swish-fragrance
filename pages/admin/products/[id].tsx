import type { GetServerSideProps, NextPage } from "next";
import productController from "../../../src/modules/products/controllers/product_controller";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import adminServerProps from "../../../src/shared/utils/adminServerProps";
import { SubmitHandler, useForm } from "react-hook-form";
import UploadImageButton from "../../../src/shared/components/UploadImageButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UpdateImageButton from "../../../src/shared/components/UpdateImageButton";
import { observer } from "mobx-react-lite";
import { yupResolver } from "@hookform/resolvers/yup";
import errorToast from "../../../src/shared/utils/errorToast";
import productSchema from "../../../src/shared/constants/schemas/product_schema";
import { IProductInputs } from "../../../src/shared/types/interfaces";
import { ProductModel } from "../../../src/modules/products/data/models/product_model";
import { ErrorModel } from "../../../src/shared/data/models/errror_model";
import ErrorContent from "../../../src/shared/components/ErrorContent";
import convert2base64 from "../../../src/shared/utils/convert2Base64";
import Routes from "../../../src/shared/constants/routes";
import ProductHeading from "../../../src/modules/products/components/ProductHeading";
import { BASE_URL } from "../../../src/shared/constants/urls";
import ProductInputs from "../../../src/modules/products/components/ProductInputs";
import { IoPricetagOutline, IoPricetagsOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";

interface ProductDetailsPageProps {
  id: string;
  product: ProductModel | null;
  error: ErrorModel | null;
}

const ProductDetails: NextPage<ProductDetailsPageProps> = (props) => {
  const [product, setProduct] = useState(props.product);
  const [error, setError] = useState(props.error);
  const [image, setImage] = useState<string | null>(null);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<IProductInputs>({
    defaultValues: {
      ...product?.data.attributes,
      image: null,
    },
    resolver: yupResolver(productSchema),
  });

  const onSubmit: SubmitHandler<IProductInputs> = async (data) => {
    const { error, product } = await productController.update(
      props.id,
      isImageUpdated,
      data
    );
    if (error) {
      errorToast(error.name, error.message);
    }

    if (product) {
      router.push(Routes.PRODUCTS);
    }
  };

  const updateImage = (file: File) => {
    convert2base64(file, setImage);
    setIsImageUpdated(true);
    setValue("image", file, { shouldDirty: true });
  };

  useEffect(() => {
    if (product?.data.attributes.image.data?.attributes.url) {
      setImage(
        `${BASE_URL}${product.data.attributes.image.data.attributes.url}`
      );
    }
  }, [product]);

  return (
    <AdminLayout
      titlePrefix={product?.data.attributes.name ?? "Product Details"}
    >
      {product ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <ProductHeading isDirty={isDirty} product={product} />
            <div className="mb-4 shadow stats stats-vertical lg:stats-horizontal bg-base-200 md:mb-8">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <IoPricetagsOutline className="text-2xl md:text-3xl" />
                </div>
                <div className="stat-title">Revenue</div>
                <div className="stat-value text-primary">GH¢25.6K</div>
                <div className="stat-desc">21% more than last month</div>
              </div>
              <div className="stat">
                <div className="stat-figure text-primary">
                  <MdOutlineAttachMoney className="text-2xl md:text-3xl" />
                </div>
                <div className="stat-title">Profit</div>
                <div className="stat-value text-primary">GH¢25.6K</div>
                <div className="stat-desc">45% more than last month</div>
              </div>
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <IoPricetagOutline className="text-2xl md:text-3xl" />
                </div>
                <div className="stat-title">Cost</div>
                <div className="stat-value text-secondary">GH¢2.6M</div>
                <div className="stat-desc">63% more than last month</div>
              </div>
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <GiShoppingCart className="text-2xl md:text-3xl" />
                </div>
                <div className="stat-title">Orders</div>
                <div className="stat-value text-secondary">2.6M</div>
                <div className="stat-desc">200% more than last month</div>
              </div>
            </div>

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
                  setImage(null);
                  setIsImageUpdated(true);
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
          </div>

          <ProductInputs register={register} errors={errors} />
        </form>
      ) : (
        <div className="flex items-center justify-center h-[500px]">
          <ErrorContent
            title={`brand with id #${props.id}`}
            errorMessage={error?.message}
            errorName={error?.name}
            setContent={() => {
              productController.getOne(props.id).then((res) => {
                const { error, product } = res;
                if (error) {
                  errorToast(error.name, error.message);
                  setError(error);
                }

                if (product) {
                  setProduct(product);
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
    const results = await productController.getOne(id);

    return {
      props: {
        id,
        ...results,
      },
    };
  });
};

export default observer(ProductDetails);
