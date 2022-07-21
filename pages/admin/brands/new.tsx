import type { NextPage } from "next";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import LabelledInput from "../../../src/shared/components/LabelledInput";
import UploadImageButton from "../../../src/shared/components/UploadImageButton";
import http from "../../../src/shared/utils/http";

interface NewBrandPageProps {}

const NewBrand: NextPage<NewBrandPageProps> = ({}) => {
  const [files, setFiles] = useState<FileList | null>(null);

  interface NewBrandInputs {
    name: string;
    image: FileList;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewBrandInputs>();

  const onSubmit: SubmitHandler<NewBrandInputs> = (data) => {
    uploadImage(data.image);
  };

  const uploadImage = async (image: FileList) => {
    http
      .post("/upload", image.item(0))
      .then((response) => {
        const imageId = response.data[0].id;
        console.log(response);
        console.log(imageId);

        http
          .post("http://localhost:1337/people", { image: imageId })
          .then((response) => {
            //handle success
          })
          .catch((error) => {
            //handle error
          });
      })
      .catch((error) => {
        //handle error
      });
  };

  return (
    <AdminLayout titlePrefix="New Brand">
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

          <div>
            <input
              type="file"
              accept="image/*"
              id="image"
              className="hidden"
              {...register("image")}
            />
            <label htmlFor="image">
              <UploadImageButton />
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
