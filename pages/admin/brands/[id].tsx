import { observer } from "mobx-react-lite";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import brandsController from "../../../src/modules/brands/controllers/brands_controller";
import brandController from "../../../src/modules/brands/controllers/brand_controller";
import { BrandModel } from "../../../src/modules/brands/data/models/brand_model";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import CategoriesProductsSelectView from "../../../src/shared/components/CategoriesProductsSelectView";
import ErrorContent from "../../../src/shared/components/ErrorContent";
import FormBottomLabel from "../../../src/shared/components/FormBottomLabel";
import LabelledInput from "../../../src/shared/components/LabelledInput";
import SizedDeleteButton from "../../../src/shared/components/SizedDeleteButton";
import SizedEditBackButton from "../../../src/shared/components/SizedEditBackButton";
import SizedSaveButton from "../../../src/shared/components/SizedSaveButton";
import UpdateImageButton from "../../../src/shared/components/UpdateImageButton";
import UploadImageButton from "../../../src/shared/components/UploadImageButton";
import Routes from "../../../src/shared/constants/routes";
import { EDIT_BRAND_IMAGE_LOCAL_STORAGE_KEY } from "../../../src/shared/constants/strings";
import { ErrorModel } from "../../../src/shared/data/models/errror_model";
import {
  IImageDetails,
  IBrandInputs,
} from "../../../src/shared/types/interfaces";
import errorToast from "../../../src/shared/utils/errorToast";

interface BrandDetailsPageProps {
  id: string;
  error: ErrorModel | null;
  brand: BrandModel | null;
}

const BrandDetails: NextPage<BrandDetailsPageProps> = (props) => {
  const [brand, setBrand] = useState(props.brand);
  const [error, setError] = useState(props.error);
  const [isEditing, setIsEditing] = useState(false);
  const [isImageAdded, setIsImageAdded] = useState(
    !!props.brand?.data.attributes.image.data
  );
  const [imageDetails, setImageDetails] = useState<IImageDetails | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<IBrandInputs>({
    defaultValues: {
      name: brand?.data.attributes.name,
      image: props.brand?.data.attributes.image.data?.id,
    },
  });

  const customSetValue = (value?: number) => {
    setValue("image", value, {
      shouldDirty: true,
    });
  };

  useEffect(() => {
    const imageData = props.brand?.data.attributes.image.data;
    if (imageData) {
      imageData.attributes.url;
      const imageDetails = {
        id: imageData.id,
        url: imageData.attributes.url,
      } as IImageDetails;
      setImageDetails(imageDetails);
      setIsImageAdded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<IBrandInputs> = async (data) => {
    brandController.update(brand?.data.id.toString()!, data).then((res) => {
      const { error, brand } = res;
      if (error) {
        errorToast(error.name, error.message);
      }

      if (brand) {
        setBrand(brand);
        setIsEditing(!isEditing);
      }
    });
  };

  return (
    <AdminLayout titlePrefix={brand?.data.attributes.name ?? "Brand Details"}>
      {!brand ? (
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
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-between gap-2 pt-4 sm:flex-row sm:items-center">
            <div>
              <p className="custom-heading1">{brand.data.attributes.name}</p>

              <p className="custom-subtitle1">
                {brand.data.attributes.products.data?.length} product(s) found
              </p>
            </div>

            {isEditing ? (
              <div className="flex gap-3">
                <SizedEditBackButton
                  title="Back"
                  onClick={() => setIsEditing(!isEditing)}
                />
                <SizedSaveButton
                  isLoading={brandsController.loading}
                  title="Save"
                  isDisabled={!isDirty}
                />
              </div>
            ) : (
              <div className="flex gap-3">
                <SizedDeleteButton
                  onClick={() => {
                    brandController
                      .delete(brand.data.id.toString())
                      .then((res) => {
                        const { error, results } = res;
                        if (error) {
                          errorToast(error.name, error.message);
                        }

                        router.push(Routes.BRANDS);
                      });
                  }}
                />

                <SizedEditBackButton
                  title="Edit"
                  onClick={() => setIsEditing(!isEditing)}
                />
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="pt-4">
              {isImageAdded && imageDetails ? (
                <UpdateImageButton
                  imageDetails={imageDetails}
                  imageLocalStorageKey={EDIT_BRAND_IMAGE_LOCAL_STORAGE_KEY}
                  setImageDetails={(value) => setImageDetails(value)}
                  setIsImageAdded={(value) => setIsImageAdded(value)}
                  setValue={(value) => customSetValue(value)}
                />
              ) : (
                <UploadImageButton
                  imageLocalStorageKey={EDIT_BRAND_IMAGE_LOCAL_STORAGE_KEY}
                  setImageDetails={(id, url) => setImageDetails({ id, url })}
                  setIsImageAdded={() => setIsImageAdded(true)}
                  setValue={(value) => customSetValue(value)}
                />
              )}

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
                          message:
                            "Brand name must contain at least 3 characters",
                        },
                      })}
                    />

                    {errors?.name && (
                      <FormBottomLabel message={errors.name.message!} />
                    )}
                  </LabelledInput>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col justify-between gap-2 pt-4 sm:flex-row sm:items-center">
                <p className="custom-heading1">Products</p>

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
              <p className="custom-subtitle1">
                Manage your products to increase sales
              </p>
            </div>
          )}
        </form>
      )}
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id as string;
  const results = await brandController.getOne(id);

  return {
    props: {
      id,
      ...results,
    },
  };
};

export default observer(BrandDetails);
