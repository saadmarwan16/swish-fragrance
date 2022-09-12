import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import brandsController from "../../../src/modules/brands/controllers/brands_controller";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import LabelledInput from "../../../src/shared/components/LabelledInput";
import UploadImageButton from "../../../src/shared/components/UploadImageButton";
import Routes from "../../../src/shared/constants/routes";
import {
  IImageDetails,
  IBrandInputs,
} from "../../../src/shared/types/interfaces";
import UpdateImageButton from "../../../src/shared/components/UpdateImageButton";
import {
  BRAND_IMAGE_LOCAL_STORAGE_KEY,
  SUCCESS,
} from "../../../src/shared/constants/strings";
import FormBottomLabel from "../../../src/shared/components/FormBottomLabel";
import { observer } from "mobx-react-lite";
import SizedSaveButton from "../../../src/shared/components/SizedSaveButton";
import errorToast from "../../../src/shared/utils/errorToast";

interface NewBrandPageProps {}

const NewBrand: NextPage<NewBrandPageProps> = ({}) => {
  const [isImageAdded, setIsImageAdded] = useState(false);
  const [imageDetails, setImageDetails] = useState<IImageDetails | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<IBrandInputs>();

  const onSubmit: SubmitHandler<IBrandInputs> = async (data) => {
    const { error, results } = await brandsController.create(data);
    if (error) {
      errorToast(error.name, error.message);
    }

    if (results === SUCCESS) {
      localStorage.removeItem(BRAND_IMAGE_LOCAL_STORAGE_KEY);
      router.push(Routes.BRANDS);
    }
  };

  const customSetValue = (id?: number) => {
    setValue("image", id, {
      shouldDirty: true,
    });
  };

  useEffect(() => {
    const imageDetailsString = localStorage.getItem(
      BRAND_IMAGE_LOCAL_STORAGE_KEY
    );
    if (imageDetailsString !== null) {
      const imageDetails = JSON.parse(imageDetailsString) as IImageDetails;
      setImageDetails(imageDetails);
      setIsImageAdded(true);
      customSetValue(imageDetails.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminLayout titlePrefix="New Brand">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="custom-heading2">Create New Brand</p>
            <SizedSaveButton
              isLoading={brandsController.loading}
              title="Save"
              isDisabled={!isDirty}
            />
          </div>

          {isImageAdded && imageDetails !== null ? (
            <UpdateImageButton
              imageLocalStorageKey={BRAND_IMAGE_LOCAL_STORAGE_KEY}
              imageDetails={imageDetails}
              setIsImageAdded={(value) => setIsImageAdded(value)}
              setImageDetails={(value) => setImageDetails(value)}
              setValue={(value) => customSetValue(value)}
            />
          ) : (
            <UploadImageButton
              imageLocalStorageKey={BRAND_IMAGE_LOCAL_STORAGE_KEY}
              setImageDetails={(id, url) => setImageDetails({ id, url })}
              setIsImageAdded={() => setIsImageAdded(true)}
              setValue={(value) => customSetValue(value)}
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
                  required: "Brand name is required",
                  minLength: {
                    value: 3,
                    message: "Brand name must contain at least 3 characters",
                  },
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

export default observer(NewBrand);
