import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import brandsController from "../../../src/modules/admin/brands/brands_controller";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import LabelledInput from "../../../src/shared/components/LabelledInput";
import UploadImageButton from "../../../src/shared/components/UploadImageButton";
import Routes from "../../../src/shared/constants/routes";
import {
  IImageDetails,
  INewBrandInputs,
} from "../../../src/shared/types/interfaces";
import UpdateImageButton from "../../../src/shared/components/UpdateImageButton";
import { BRAND_IMAGE_LOCAL_STORAGE_KEY } from "../../../src/shared/constants/strings";
import FormBottomLabel from "../../../src/shared/components/FormBottomLabel";

interface NewBrandPageProps {}

const NewBrand: NextPage<NewBrandPageProps> = ({}) => {
  const [isImageAdded, setIsImageAdded] = useState(false);
  const [imageDetails, setImageDetails] = useState<IImageDetails | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewBrandInputs>();

  const onSubmit: SubmitHandler<INewBrandInputs> = async (data) => {
    const results = await brandsController.newBrand(
      JSON.stringify({
        data: {
          name: data.name,
          image: imageDetails?.id,
        },
      })
    );
    if (results === "success") {
      localStorage.removeItem(BRAND_IMAGE_LOCAL_STORAGE_KEY);
      router.push(Routes.BRANDS);
    }
  };

  useEffect(() => {
    const imageDetailsString = localStorage.getItem(
      BRAND_IMAGE_LOCAL_STORAGE_KEY
    );
    if (imageDetailsString !== null) {
      setImageDetails(JSON.parse(imageDetailsString));
      setIsImageAdded(true);
    }
  }, []);

  return (
    <AdminLayout titlePrefix="New Brand">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="custom-heading2">Create New Brand</p>
            <button
              className="!w-14 sm:!w-16 md:!w-20 custom-primary-button"
              type="submit"
            >
              Save
            </button>
          </div>

          {isImageAdded && imageDetails !== null ? (
            <UpdateImageButton
              imageLocalStorageKey={BRAND_IMAGE_LOCAL_STORAGE_KEY}
              imageDetails={imageDetails}
              setIsImageAdded={() => setIsImageAdded(true)}
              setImageDetails={(id, url) => setImageDetails({ id, url })}
            />
          ) : (
            <UploadImageButton
              imageLocalStorageKey={BRAND_IMAGE_LOCAL_STORAGE_KEY}
              setImageDetails={(id, url) => setImageDetails({ id, url })}
              setIsImageAdded={() => setIsImageAdded(true)}
            />
          )}
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <div className="new-product-layout">
            <LabelledInput isRequired={true} topFormText={"Name"}>
              <input
                className={`custom-input sm:!w-2/3 md:!w-1/2 ${
                  errors.name && "!border-error"
                }`}
                placeholder="Enter name here"
                {...register("name", {
                  required: "Brand name must contain at least 3 characters",
                  minLength: 3,
                })}
              />

              {errors?.name && (
                <FormBottomLabel message={errors.name.message!} />
              )}
            </LabelledInput>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default NewBrand;
