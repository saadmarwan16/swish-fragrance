import type { GetServerSideProps, NextPage } from "next";
import AdminLayout from "../../../src/shared/components/AdminLayout";
import { RiImageAddFill } from "react-icons/ri";
import LabelledInput from "../../../src/shared/components/LabelledInput";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { NewProductInputs } from "../../../src/shared/types/interfaces";
import ReactHookFormInput from "../../../src/shared/components/ReactHookFormInput";
import http from "../../../src/shared/utils/http";
import { BrandsModel } from "../../../src/modules/admin/brands/brands_model";
import { CategoriesModel } from "../../../src/modules/admin/categories/categories_model";
import { AiFillDelete } from "react-icons/ai";
import UploadImageButton from "../../../src/shared/components/UploadImageButton";

interface NewProductPageProps {
  brands: BrandsModel;
  categories: CategoriesModel;
}

const NewProduct: NextPage<NewProductPageProps> = ({ brands, categories }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<NewProductInputs>();
  const { fields, append, remove } = useFieldArray({
    name: "categories",
    control,
  });

  const onSubmit: SubmitHandler<NewProductInputs> = (data) => console.log(data);

  return (
    <AdminLayout titlePrefix="New Product">
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

          <UploadImageButton />
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <div className="new-product-layout">
            <ReactHookFormInput
              register={register}
              isRequired={true}
              topFormText="Name"
              field="name"
              placeholder="Enter name here"
            />

            <LabelledInput isRequired={true} topFormText="Size">
              <select className="custom-select" {...register("size")}>
                <option disabled selected>
                  Choose a size
                </option>
                <option>15 ML</option>
                <option>30 ML</option>
                <option>50 ML</option>
                <option>100 ML</option>
              </select>
            </LabelledInput>
          </div>
          <div className="new-product-layout">
            <ReactHookFormInput
              register={register}
              isRequired={true}
              topFormText="Cost Price"
              field="cost_price"
              placeholder="Enter cost price here"
            />

            <ReactHookFormInput
              register={register}
              isRequired={true}
              topFormText="Selling Price"
              field="selling_price"
              placeholder="Enter selling here"
            />
          </div>
          <div className="new-product-layout">
            <ReactHookFormInput
              register={register}
              isRequired={false}
              topFormText="Number In Stock"
              field="in_stock"
              placeholder="Enter number in stock here"
              topFormTextSuffix="(Defaults to 0)"
            />

            <ReactHookFormInput
              register={register}
              isRequired={false}
              topFormText="Re-stock Point"
              field="restock_point"
              placeholder="Enter re-stock point here"
              topFormTextSuffix="(Defaults to 0)"
            />
          </div>
          <div className="new-product-layout">
            <ReactHookFormInput
              register={register}
              isRequired={false}
              topFormText="Number Sold"
              field="number_sold"
              placeholder="Enter number sold here"
              topFormTextSuffix="(Defaults to 0)"
            />

            <ReactHookFormInput
              register={register}
              isRequired={false}
              topFormText="Revenue"
              field="revenue_generated"
              placeholder="Enter revenue generated here"
              topFormTextSuffix="(Defaults to 0)"
            />
          </div>
          <div className="new-product-layout">
            <ReactHookFormInput
              register={register}
              isRequired={false}
              topFormText="Discount"
              field="discount"
              placeholder="Enter discount here"
              topFormTextSuffix="(Defaults to 0)"
            />

            <LabelledInput isRequired={true} topFormText="Brand">
              <select className="custom-select">
                <option disabled selected>
                  Choose a brand
                </option>
                {brands.data.map((brand) => (
                  <option key={brand.id}>{brand.attributes.name}</option>
                ))}
              </select>
            </LabelledInput>
          </div>

          <div className="pt-2 sm:pt-4">
            {fields.map((field, index) => (
              <div key={field.id} className='flex items-center gap-2'>
                <LabelledInput isRequired={true} topFormText="Category">
                  <select
                    className="custom-select"
                    {...register(`categories.${index}.name`)}
                  >
                    <option disabled selected>
                      Choose a category
                    </option>
                    {categories.data.map((category) => (
                      <option key={category.id}>
                        {category.attributes.name}
                      </option>
                    ))}
                  </select>
                </LabelledInput>
                <button className="btn btn-primary md:btn-square"  onClick={() => remove(index)}>
                  <AiFillDelete className="text-2xl" />
                </button>
              </div>
            ))}
            <button
              className="btn btn-primary"
              onClick={() =>
                append({
                  name: "string",
                })
              }
            >
              Append Category
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const brands = await http.get("/brands");
  const categories = await http.get("categories");

  return {
    props: {
      brands: brands.data,
      categories: categories.data,
    },
  };
};

export default NewProduct;
