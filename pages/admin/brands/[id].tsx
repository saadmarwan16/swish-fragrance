import { observer } from "mobx-react-lite";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GrView } from "react-icons/gr";
import brandsController from "../../../src/modules/brands/controllers/brands_controller";
import brandController from "../../../src/modules/brands/controllers/brand_controller";
import { BrandModel } from "../../../src/modules/brands/data/models/brand_model";
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
import { IBrandInputs } from "../../../src/shared/types/interfaces";
import adminServerProps from "../../../src/shared/utils/adminServerProps";
import errorToast from "../../../src/shared/utils/errorToast";

interface BrandDetailsPageProps {
  id: string;
  error: ErrorModel | null;
  brand: BrandModel | null;
}

const BrandDetails: NextPage<BrandDetailsPageProps> = (props) => {
  const [brand, setBrand] = useState(props.brand);
  const [error, setError] = useState(props.error);
  const [image, setImage] = useState<string | null>(() => {
    if (!props.brand?.data.attributes.image.data?.attributes.url) {
      return null;
    }

    return `${BASE_URL}${props.brand?.data.attributes.image.data?.attributes.url}`;
  });
  const brandStatistics = useMemo(() => {}, [brand]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<IBrandInputs>({
    defaultValues: {
      name: brand?.data.attributes.name,
      image: null,
    },
  });

  const onSubmit: SubmitHandler<IBrandInputs> = async (data) => {
    const imageId = brand?.data.attributes.image.data?.id;
    console.log(data);
    brandController
      .update(brand?.data.id.toString()!, imageId, data)
      .then((res) => {
        const { error, brand } = res;
        if (error) {
          errorToast(error.name, error.message);

          return;
        }

        if (brand) {
          setBrand(brand);
          router.push(Routes.BRANDS);
        }
      });
  };

  const updateImage = (file: File) => {
    convert2base64(file);
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

              <SizedSaveButton
                isLoading={brandsController.loading}
                title="Save"
                isDisabled={!isDirty}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-10 md:flex-row sm:gap-8 md:gap-12 lg:gap-16">
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
                    setImage(null);
                    setValue("image", null, {
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

            <div className="flex-1">
              <h2 className="custom-heading2">Products</h2>
            </div>
          </div>
        </form>
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
