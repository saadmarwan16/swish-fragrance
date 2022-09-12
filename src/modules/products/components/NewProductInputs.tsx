import { FunctionComponent } from "react";
import {
  DeepRequired,
  FieldErrorsImpl,
  UseFormRegister,
} from "react-hook-form";
import { INewProductInputs } from "../../../shared/types/interfaces";
import NewProductInput from "./NewProductInput";
import NewProductSizeInput from "./NewProductSizeInput";

interface NewProductInputsProps {
  register: UseFormRegister<INewProductInputs>;
  errors: FieldErrorsImpl<DeepRequired<INewProductInputs>>;
}

const NewProductInputs: FunctionComponent<NewProductInputsProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-2 pt-4">
      <div className="new-product-layout">
        <NewProductInput
          isRequired={true}
          topLabel="Name"
          placeholder="Enter name here"
          type="text"
          error={errors.name}
          register={register("name", {
            required: "Product name is required",
            minLength: {
              value: 3,
              message: "Product name must contain at least 3 characters",
            },
          })}
        />

        <NewProductSizeInput
          error={errors.size}
          register={register("size", {
            required: "Product size cannot be empty",
          })}
        />
      </div>
      <div className="new-product-layout">
        <NewProductInput
          isRequired={true}
          topLabel="Cost Price"
          placeholder="Enter cost price here"
          type="number"
          error={errors.cost_price}
          step={0.01}
          register={register("cost_price", {
            valueAsNumber: true,
          })}
        />

        <NewProductInput
          isRequired={true}
          topLabel="Selling Price"
          placeholder="Enter selling price here"
          type="number"
          error={errors.selling_price}
          step={0.01}
          register={register("selling_price", {
            valueAsNumber: true,
          })}
        />
      </div>
      <div className="new-product-layout">
        <NewProductInput
          isRequired={false}
          topLabel="Number In Stock"
          placeholder="Enter number in stock here"
          type="number"
          step={1}
          register={register("in_stock", {
            valueAsNumber: true,
          })}
        />

        <NewProductInput
          isRequired={false}
          topLabel="Re-stock Point"
          placeholder="Enter re-stock point here"
          type="number"
          step={1}
          register={register("restock_point", {
            valueAsNumber: true,
          })}
        />
      </div>
      <div className="new-product-layout">
        <NewProductInput
          isRequired={false}
          topLabel="Number Sold"
          placeholder="Enter number sold here"
          type="number"
          step={1}
          register={register("number_sold", {
            valueAsNumber: true,
          })}
        />

        <NewProductInput
          isRequired={false}
          topLabel="Revenue"
          placeholder="Enter revenue generated here"
          type="number"
          step={0.01}
          register={register("revenue_generated", {
            valueAsNumber: true,
          })}
        />
      </div>
      <div className="new-product-layout">
        <NewProductInput
          isRequired={false}
          topLabel="Discount"
          placeholder="Enter discount here"
          type="number"
          step={0.01}
          register={register("discount", {
            valueAsNumber: true,
          })}
        />

        <NewProductInput
          isRequired={false}
          topLabel="Profit"
          placeholder="Enter profit here"
          type="number"
          step={0.01}
          register={register("profit", {
            valueAsNumber: true,
          })}
        />
      </div>
    </div>
  );
};

export default NewProductInputs;
