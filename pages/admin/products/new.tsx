import type { NextPage } from "next";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import UploadImageButton from "../../../src/shared/components/UploadImageButton";
import { INewProductInputs } from "../../../src/shared/types/interfaces";
import { useState } from "react";
import { useRouter } from "next/router";
import Routes from "../../../src/shared/constants/routes";
import { SUCCESS } from "../../../src/shared/constants/strings";
import UpdateImageButton from "../../../src/shared/components/UpdateImageButton";
import productsController from "../../../src/modules/products/controllers/products_controller";
import NewProductInputs from "../../../src/modules/products/components/NewProductInputs";
import { observer } from "mobx-react-lite";
import { yupResolver } from "@hookform/resolvers/yup";
import newProductSchema from "../../../src/shared/constants/schemas/new_product_schema";
import errorToast from "../../../src/shared/utils/errorToast";

interface NewProductPageProps {}

const NewProduct: NextPage<NewProductPageProps> = () => {
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<INewProductInputs>({
    resolver: yupResolver(newProductSchema),
  });

  const onSubmit: SubmitHandler<INewProductInputs> = async (data) => {
    console.log(data);
    // const { error, results } = await productsController.create(data);
    // if (error) {
    //   errorToast(error.name, error.message);
    // }

    // if (results === SUCCESS) {
    //   router.push(Routes.PRODUCTS);
    // }
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

        <NewProductInputs register={register} errors={errors} />
      </form>
    </AdminLayout>
  );
};

export default observer(NewProduct);
