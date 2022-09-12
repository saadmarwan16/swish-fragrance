import type { NextPage } from "next";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import { SubmitHandler, useForm } from "react-hook-form";
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
import productsController from "../../../src/modules/products/controllers/products_controller";
import NewProductInputs from "../../../src/modules/products/components/NewProductInputs";
import { observer } from "mobx-react-lite";

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

  const onSubmit: SubmitHandler<INewProductInputs> = async (data) => {
    const results = await productsController.newProduct(
      JSON.stringify({
        data: {
          ...data,
          image: imageDetails?.id,
        },
      })
    );
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
              className={`!w-14 sm:!w-16 md:!w-20 custom-primary-button ${
                productsController.loading && "loading"
              }`}
              type="submit"
            >
              {productsController.loading ? "" : "Save"}
            </button>
          </div>

          {isImageAdded && imageDetails ? (
            <UpdateImageButton
              imageLocalStorageKey={PRODUCT_IMAGE_LOCAL_STORAGE_KEY}
              imageDetails={imageDetails}
              setIsImageAdded={() => setIsImageAdded(true)}
              setImageDetails={(value) => setImageDetails(value)}
              setValue={() => {}}
            />
          ) : (
            <UploadImageButton
              imageLocalStorageKey={PRODUCT_IMAGE_LOCAL_STORAGE_KEY}
              setImageDetails={(id, url) => setImageDetails({ id, url })}
              setIsImageAdded={() => setIsImageAdded(true)}
              setValue={() => {}}
            />
          )}
        </div>

        <NewProductInputs register={register} errors={errors} />
      </form>
    </AdminLayout>
  );
};

export default observer(NewProduct);
