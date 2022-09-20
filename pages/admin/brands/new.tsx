import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import brandsController from "../../../src/modules/brands/controllers/brands_controller";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import UploadImageButton from "../../../src/shared/components/UploadImageButton";
import Routes from "../../../src/shared/constants/routes";
import { IBrandInputs } from "../../../src/shared/types/interfaces";
import UpdateImageButton from "../../../src/shared/components/UpdateImageButton";
import { observer } from "mobx-react-lite";
import SizedSaveButton from "../../../src/shared/components/SizedSaveButton";
import errorToast from "../../../src/shared/utils/errorToast";
import adminServerProps from "../../../src/shared/utils/adminServerProps";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../../src/shared/components/InputField";
import { SUCCESS } from "../../../src/shared/constants/strings";
import newBrandSchema from "../../../src/shared/constants/schemas/new_brand_schema";

interface NewBrandPageProps {}

const NewBrand: NextPage<NewBrandPageProps> = ({}) => {
  const [image, setImage] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<IBrandInputs>({
    resolver: yupResolver(newBrandSchema),
  });

  const onSubmit: SubmitHandler<IBrandInputs> = async (data) => {
    const { error, results } = await brandsController.create(data);
    if (error) {
      errorToast(error.name, error.message);
    }

    if (results === SUCCESS) {
      router.push(Routes.BRANDS);
    }
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
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <div className="new-product-layout">
            <div className="w-full sm:!w-2/3 md:!w-1/2">
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
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return adminServerProps(ctx, async () => {
    return {
      props: {},
    };
  });
};

export default observer(NewBrand);
