import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import brandsController from "../../../src/modules/admin/brands/brands_controller";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import LabelledInput from "../../../src/shared/components/LabelledInput";
import UploadImageButton from "../../../src/shared/components/UploadImageButton";
import Routes from "../../../src/shared/constants/routes";
import { INewBrandInputs } from "../../../src/shared/types/interfaces";
import http from "../../../src/shared/utils/http";

interface NewBrandPageProps {}

const NewBrand: NextPage<NewBrandPageProps> = ({}) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isImageAdded, setIsImageAdded] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewBrandInputs>();

  const onSubmit: SubmitHandler<INewBrandInputs> = async (data) => {
    console.log(data);
    // uploadImage(data.image);
    const results = await brandsController.newBrand(data);
    if (results === "success") {
      router.push(Routes.BRANDS);
    }
  };

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

          <div>
            <input
              type="file"
              accept="image/*"
              id="image"
              className="hidden"
              {...register("image", {
                onChange: (e) => {
                  console.log("target", e.target.value);
                  const str = "dkaf";
                  str.split("");
                  setIsImageAdded(true);
                },
              })}
            />

            <label htmlFor="image">
              <UploadImageButton isImageAdded={isImageAdded} />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <div className="new-product-layout">
            <LabelledInput isRequired={true} topFormText={"Name"}>
              <input
                className="custom-input"
                placeholder="Enter name here "
                {...register("name")}
              />
            </LabelledInput>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default NewBrand;
