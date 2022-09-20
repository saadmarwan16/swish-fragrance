import type { NextPage } from "next";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import UploadImageButton from "../../../src/shared/components/UploadImageButton";
import { useState } from "react";
import { useRouter } from "next/router";
import Routes from "../../../src/shared/constants/routes";
import { SUCCESS } from "../../../src/shared/constants/strings";
import UpdateImageButton from "../../../src/shared/components/UpdateImageButton";
import productsController from "../../../src/modules/products/controllers/products_controller";
import { observer } from "mobx-react-lite";
import { yupResolver } from "@hookform/resolvers/yup";
import errorToast from "../../../src/shared/utils/errorToast";
import SizedSaveButton from "../../../src/shared/components/SizedSaveButton";
import productSchema from "../../../src/shared/constants/schemas/product_schema";
import { IProductInputs } from "../../../src/shared/types/interfaces";
import ProductInputs from "../../../src/modules/products/components/ProductInputs";

interface NewProductPageProps {}

const NewProduct: NextPage<NewProductPageProps> = () => {
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProductInputs>({
    resolver: yupResolver(productSchema),
  });

  const onSubmit: SubmitHandler<IProductInputs> = async (data) => {
    const { error, results } = await productsController.create(data);
    if (error) {
      errorToast(error.name, error.message);
    }

    if (results === SUCCESS) {
      router.push(Routes.PRODUCTS);
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
    <AdminLayout titlePrefix="New Product">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="custom-heading2">Create New Product</p>
            <SizedSaveButton
              isLoading={productsController.loading}
              title="Save"
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

        <ProductInputs register={register} errors={errors} />
      </form>
    </AdminLayout>
  );
};

export default observer(NewProduct);
