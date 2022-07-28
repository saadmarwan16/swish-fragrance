import type { NextPage } from "next";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import LabelledInput from "../../../src/shared/components/LabelledInput";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactHookFormInput from "../../../src/shared/components/ReactHookFormInput";
import http from "../../../src/shared/utils/http";
import UploadImageButton from "../../../src/shared/components/UploadImageButton";
import {
  IImageDetails,
  INewProductInputs,
} from "../../../src/shared/types/interfaces";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Routes from "../../../src/shared/constants/routes";
import { PRODUCT_IMAGE_LOCAL_STORAGE_KEY } from "../../../src/shared/constants/strings";
import UpdateImageButton from "../../../src/shared/components/UpdateImageButton";
import FormBottomLabel from "../../../src/shared/components/FormBottomLabel";
import productsController from "../../../src/modules/admin/products/products_controller";

interface NewProductPageProps {}

const NewProduct: NextPage<NewProductPageProps> = () => {
  const [isImageAdded, setIsImageAdded] = useState(false);
  const [imageDetails, setImageDetails] = useState<IImageDetails | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewProductInputs>();

  console.log("errors: ", errors);

  //   Size: 15
  // Size: 30
  // Size: 50
  // Size: 100

  const onSubmit: SubmitHandler<INewProductInputs> = async (data) => {
    console.log("data: ", data);
    let updatedData;
    if (imageDetails?.id) {
      updatedData = {
        data: {
          ...data,
          image: imageDetails?.id,
        },
      };
    } else {
      updatedData = {
        data: {
          ...data,
        },
      };
    }

    const results = await productsController.newProduct(JSON.stringify(updatedData));
    if (results === "success") {
      localStorage.removeItem(PRODUCT_IMAGE_LOCAL_STORAGE_KEY);
      router.push(Routes.PRODUCTS);
    }
  };

  useEffect(() => {
    const imageDetailsString = localStorage.getItem(
      PRODUCT_IMAGE_LOCAL_STORAGE_KEY
    );
    if (imageDetailsString !== null) {
      setImageDetails(JSON.parse(imageDetailsString));
      setIsImageAdded(true);
    }
  }, []);

  return (
    <AdminLayout titlePrefix="New Product">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="custom-heading2">Create New Product</p>
            <button
              className="!w-14 sm:!w-16 md:!w-20 custom-primary-button"
              type="submit"
            >
              Save
            </button>
          </div>

          {isImageAdded && imageDetails ? (
            <UpdateImageButton
              imageLocalStorageKey={PRODUCT_IMAGE_LOCAL_STORAGE_KEY}
              imageDetails={imageDetails}
              setIsImageAdded={() => setIsImageAdded(true)}
              setImageDetails={(id, url) => setImageDetails({ id, url })}
            />
          ) : (
            <UploadImageButton
              imageLocalStorageKey={PRODUCT_IMAGE_LOCAL_STORAGE_KEY}
              setImageDetails={(id, url) => setImageDetails({ id, url })}
              setIsImageAdded={() => setIsImageAdded(true)}
            />
          )}
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <div className="new-product-layout">
            <ReactHookFormInput
              register={register}
              isRequired={true}
              topFormText="Name"
              field="name"
              errors={errors}
              errorMessage="Product name must contain at least 3 characters"
              placeholder="Enter name here"
            />

            <LabelledInput isRequired={true} topFormText="Size">
              <select
                className={`custom-select ${errors.size && "!border-error"}`}
                {...register("size", {
                  required: "Product size cannot be empty",
                })}
              >
                <option disabled>Choose a size</option>
                <option>15 ML</option>
                <option>30 ML</option>
                <option>50 ML</option>
                <option>100 ML</option>
              </select>

              {errors?.size && (
                <FormBottomLabel message={errors.size.message!} />
              )}
            </LabelledInput>
          </div>
          <div className="new-product-layout">
            <ReactHookFormInput
              register={register}
              isRequired={true}
              topFormText="Cost Price"
              field="cost_price"
              errors={errors}
              errorMessage="Product cost price cannot be empty"
              placeholder="Enter cost price here"
            />

            <ReactHookFormInput
              register={register}
              isRequired={true}
              topFormText="Selling Price"
              field="selling_price"
              errors={errors}
              errorMessage="Product selling price cannot be empty"
              placeholder="Enter selling here"
            />
          </div>
          <div className="new-product-layout">
            <ReactHookFormInput
              register={register}
              isRequired={false}
              topFormText="Number In Stock"
              field="in_stock"
              placeholder="Enter number in stock here"
              topFormTextSuffix="(Defaults to 0)"
            />

            <ReactHookFormInput
              register={register}
              isRequired={false}
              topFormText="Re-stock Point"
              field="restock_point"
              placeholder="Enter re-stock point here"
              topFormTextSuffix="(Defaults to 0)"
            />
          </div>
          <div className="new-product-layout">
            <ReactHookFormInput
              register={register}
              isRequired={false}
              topFormText="Number Sold"
              field="number_sold"
              placeholder="Enter number sold here"
              topFormTextSuffix="(Defaults to 0)"
            />

            <ReactHookFormInput
              register={register}
              isRequired={false}
              topFormText="Revenue"
              field="revenue_generated"
              placeholder="Enter revenue generated here"
              topFormTextSuffix="(Defaults to 0)"
            />
          </div>
          <div className="new-product-layout">
            <ReactHookFormInput
              register={register}
              isRequired={false}
              topFormText="Discount"
              field="discount"
              placeholder="Enter discount here"
              topFormTextSuffix="(Defaults to 0)"
            />

            <ReactHookFormInput
              register={register}
              isRequired={false}
              topFormText="Profit"
              field="profit"
              placeholder="Enter profit here"
              topFormTextSuffix="(Defaults to 0)"
            />
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default NewProduct;
